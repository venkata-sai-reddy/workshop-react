import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingPage } from '../../Loading/Loading';
import { DefaultColumnFilter } from '../../../utils/Common';
import { Container } from 'react-bootstrap';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from '@mui/material';
import { getNewSkills, updateApprovedSkill } from '../../../store/actions/AdminActions';
import { saveNewSkills } from '../../../store/reducers/AdminReducers';
import AdminTable from '../AdminTable';
import { toast, ToastContainer } from 'react-toastify';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { messages } from '../../../utils/CommonMessages';

const SkillsApprovePage = () => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [status, setStatus] = useState('');
    const [requestConfirm, setRequestConfirm] = useState(false);
    const [skillToUpdate, setSkillToUpdate] = useState(undefined);
    const newSkills = useSelector((state) => state?.admin?.value?.newSkills);

    useEffect(() => {
        const getSkills = async () => {
            try {
                const response = await getNewSkills();
                dispatch(saveNewSkills(response));
                setIsLoading(false);
            } catch (error) {
                console.error("Error : ", error);
                setIsLoading(false);
            }
        };

        const updateSkill = async () => {
            try {
                const response = await updateApprovedSkill(skillToUpdate);
                if (response?.data === true) {
                    toast.success(`Skill ${status} successfully!`, {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        closeButton: false,
                        draggable: false
                    });
                    setIsLoading(true);
                } else {
                    toast.error(`Failed to ${status === messages.text.APPROVED ? 'approve' : 'reject'}`, {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        closeButton: false,
                        pauseOnHover: true,
                        draggable: false
                    });
                }
                setIsUpdating(false);
            } catch (error) {
                console.error("Error : ", error);
                toast.error(`Failed to ${status === messages.text.APPROVED ? 'approve' : 'reject'}`, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    closeButton: false,
                    pauseOnHover: true,
                    draggable: false
                });
                setIsUpdating(false);
            }
        };

        if (isLoading) {
            getSkills();
        }

        if (isUpdating) {
            updateSkill();
        }

    })

    const handleReject = (skill) => {
        const rejectedSkill = {...skill,
            status: messages.text.REJECTED
        }
        setStatus(messages.text.REJECTED);
        setSkillToUpdate(rejectedSkill);
        setRequestConfirm(true);
    };

    const handleApprove = (skill) => {
        const approvedSkill = {...skill,
            status: messages.text.APPROVED
        }
        setStatus(messages.text.APPROVED);
        setSkillToUpdate(approvedSkill);
        setRequestConfirm(true);
    };

    const handleUpdateSkills = () => {
        setRequestConfirm(false);
        setIsUpdating(true);
    };

    const handleCancel = () => {
        setSkillToUpdate(undefined);
        setRequestConfirm(false);
        setIsUpdating(false);
    }

    const columns = useMemo(
        () => [
            { Header: 'Skill Name', accessor: 'skillName', Filter: DefaultColumnFilter, width: '150px' },
            { Header: 'Status', accessor: 'status', Filter: DefaultColumnFilter, width: '150px' },
            {
                Header: 'Actions',
                accessor: 'skillId',
                Filter: false,
                Cell: ({ row }) => (
                    <>
                        <IconButton
                            aria-label="approve"
                            title='approve'
                            onClick={() => handleApprove(row.original)}
                        >
                            <DoneIcon sx={{ color: 'green' }} />
                        </IconButton>
                        <IconButton
                            aria-label="reject"
                            title='reject'
                            onClick={() => handleReject(row.original)}
                        >
                            <CloseIcon sx={{ color: 'red' }} />
                        </IconButton>
                    </>
                ),
                width: '100px',
            },
        ],
        []
    );

    return isLoading ? <LoadingPage /> : (
        <Container className='users_page'>
            <Typography automationId= 'admin_skill_approve_page_title' variant="h6" className='requested_skills_title_page' sx={{ marginTop: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
                Approve Skills
            </Typography>
            <AdminTable data={newSkills} columns={columns} />
            <Dialog open={requestConfirm} onClose={handleCancel}>
                <DialogTitle align='center' automationId= 'admin_sa_confirm_title'>Confirm Update</DialogTitle>
                <DialogContent>
                    <DialogContentText automationId= 'admin_sa_confirm_text'>
                        Are you sure you want to {status === messages.text.APPROVED ? 'approve' : 'reject'} the skill?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button automationId= 'admin_sa_confirm_btn' onClick={handleUpdateSkills} color="primary">
                        Yes
                    </Button>
                    <Button automationId= 'admin_sa_confirm_cancel_btn' onClick={handleCancel} color="error">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </Container>
    );
}

export default SkillsApprovePage;
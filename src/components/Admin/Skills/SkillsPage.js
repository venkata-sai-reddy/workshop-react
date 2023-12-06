import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingPage } from '../../Loading/Loading';
import { DefaultColumnFilter, sessionUnAuthCheck } from '../../../utils/Common';
import { Container } from 'react-bootstrap';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, TextField, Typography } from '@mui/material';
import { addNewSkills, getAllSkills, updateApprovedSkill } from '../../../store/actions/AdminActions';
import { saveAllSkills } from '../../../store/reducers/AdminReducers';
import AdminTable from '../AdminTable';
import { toast, ToastContainer } from 'react-toastify';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { messages } from '../../../utils/CommonMessages';
import { useNavigate } from 'react-router';

const SkillsPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [status, setStatus] = useState('');
    const [requestConfirm, setRequestConfirm] = useState(false);
    const [skillToUpdate, setSkillToUpdate] = useState(undefined);
    const [newSkills, setNewSkills] = useState([]);
    const [isAddSkill, setIsAddSkill] = useState(false);
    const [skillForm, setSkillForm] = useState(false);
    const allSkills = useSelector((state) => state?.admin?.value?.allSkills);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await getAllSkills();
                dispatch(saveAllSkills(response));
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
                sessionUnAuthCheck(error) && navigate('/logout');
                toast.error(error?.response?.data?.message, {
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

        const addSkill = async () => {
            
            try {
                const response = await addNewSkills(newSkills);
                setSkillForm(false);
                if (response?.data === true) {
                    toast.success(`Skills Added Successfully!`, {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        closeButton: false,
                        draggable: false
                    });
                    setIsAddSkill(false);
                    setNewSkills([]);
                    setIsLoading(true);
                } else {
                    toast.error(`Failed to add skills`, {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        closeButton: false,
                        pauseOnHover: true,
                        draggable: false
                    });
                }
                setIsAddSkill(false);
            } catch (error) {
                sessionUnAuthCheck(error) && navigate('/logout');
                toast.error(error?.response?.data?.message, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    closeButton: false,
                    pauseOnHover: true,
                    draggable: false
                });
                setIsAddSkill(false);
                setSkillForm(false);
            }
        };

        if (isLoading) {
            fetchSkills();
        }

        if (isUpdating) {
            updateSkill();
        }

        if (isAddSkill) {
            addSkill();
        }
    })

    const handleReject = (skill) => {
        const rejectedSkill = {
            ...skill,
            status: messages.text.REJECTED
        }
        setStatus(messages.text.REJECTED);
        setSkillToUpdate(rejectedSkill);
        setRequestConfirm(true);
    };

    const handleApprove = (skill) => {
        const approvedSkill = {
            ...skill,
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
        setIsAddSkill(false);
        setSkillForm(false);
    }

    const handleAddSkill = () => {
        setSkillForm(true);
    }

    const handleSkillChange = (event, values) => {
        const value = values.pop()
        if (typeof(value) === 'object') {
            values.push(value);
            setNewSkills(values);
        } else {
            const inputText = value;
            console.log(inputText)
            if(inputText === undefined){
                setNewSkills([]);
            }else if (inputText !== '' && !values.find((skill) => skill.skillName === inputText)) {
                setNewSkills([...values, { skillName: inputText }]);
            }
        }
    };

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
                            disabled={row.original.status === messages.text.APPROVED}
                            onClick={() => handleApprove(row.original)}
                        >
                            <DoneIcon sx={{ color: 'green' }} />
                        </IconButton>
                        <IconButton
                            aria-label="reject"
                            title='reject'
                            disabled={row.original.status === messages.text.REJECTED}
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
            <Paper elevation={0} sx={{ position: 'relative' }}>
                <Typography variant="h6" className='users_title_page' sx={{ marginTop: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
                    Skills
                </Typography>
                <div style={{ position: 'absolute', top: 5, right: 10 }}>
                    <Button variant="contained" color="error" onClick={handleAddSkill} sx={{ fontWeight: 'bold' }}>
                        <AddIcon /> Add Skill
                    </Button>
                </div>
            </Paper>
            <AdminTable data={allSkills} columns={columns} />
            <Dialog open={requestConfirm} onClose={handleCancel}>
                <DialogTitle align='center'>Confirm Update</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to {status === messages.text.APPROVED ? 'approve' : 'reject'} the skill?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateSkills} color="primary">
                        Yes
                    </Button>
                    <Button onClick={handleCancel} color="error">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={skillForm} onClose={handleCancel} maxWidth="md" fullWidth PaperProps={{ style: { minWidth: '300px' } }}>
                <DialogTitle sx={{textAlign:'center'}}>Add Skill</DialogTitle>
                <DialogContent>
                    <Autocomplete
                        multiple
                        id="selectedSkills"
                        componentName="selectedSkills"
                        options={[]}
                        getOptionLabel={(option) => option.skillName}
                        getOptionSelected={(option, value) => option.skillId === value.skillId}
                        value={newSkills}
                        freeSolo
                        onChange={(e, newValue) => {
                            handleSkillChange(e, newValue);
                        }}
                        renderInput={(params) => (
                            <TextField
                                variant="standard"
                                {...params}
                                label="Skills"
                                fullWidth
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setIsAddSkill(true)} color="primary">
                        Add
                    </Button>
                    <Button onClick={handleCancel} color="error">
                        Cancel
                    </Button>
                    
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </Container>
    );
}

export default SkillsPage;
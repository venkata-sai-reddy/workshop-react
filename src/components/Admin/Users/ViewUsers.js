import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingPage } from '../../Loading/Loading';
import { DefaultColumnFilter } from '../../../utils/Common';
import { Container } from 'react-bootstrap';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Typography } from '@mui/material';
import { deleteUserProfile, getAllUsers } from '../../../store/actions/AdminActions';
import { saveAllUsers } from '../../../store/reducers/AdminReducers';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AdminTable from '../AdminTable';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';

const ViewUsers = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [requestConfirm, setRequestConfirm] = useState(false);
    const [userToDelete, setUserToDelete] = useState(undefined);
    const allUsers = useSelector((state) => state?.admin?.value?.allUsers);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await getAllUsers();
                console.log(response.data);
                dispatch(saveAllUsers(response));
                setIsLoading(false);
            } catch (error) {
                console.error("Error : ", error);
                setIsLoading(true);
            }
        };

        const deleteUser = async () => {
            try {
                const response = await deleteUserProfile(userToDelete);
                if (response?.data === true) {
                    toast.success('User Deleted Successfully!', {
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
                    toast.error('Failed to Delete User', {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        closeButton: false,
                        pauseOnHover: true,
                        draggable: false
                    });
                }
                setIsDeleting(false);
            } catch (error) {
                console.error("Error : ", error);
                toast.error(error?.response?.data?.message, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    closeButton: false,
                    pauseOnHover: true,
                    draggable: false
                });
                setIsDeleting(false);
            }
        };

        if (isLoading) {
            getUsers();
        }
        if (isDeleting && userToDelete !== undefined) {
            deleteUser();
        }
    })

    const handleDelete = (user) => {
        setUserToDelete(user);
        setRequestConfirm(true);
    };

    const handleView = (userDetails) => {
        navigate('/user', { state: { userId: userDetails.userId } });
    }

    const handleDeleteUser = () => {
        setRequestConfirm(false);
        setIsDeleting(true);
    };

    const handleCancel = () => {
        setUserToDelete(undefined);
        setRequestConfirm(false);
        setIsDeleting(false);
    }

    const handleAddUser = () => {
        navigate('/create-user');
    }

    const columns = useMemo(
        () => [
            { Header: 'First Name', accessor: 'firstName', Filter: DefaultColumnFilter, width: '150px' },
            { Header: 'Last Name', accessor: 'lastName', Filter: DefaultColumnFilter, width: '150px' },
            { Header: 'Email', accessor: 'emailId', Filter: DefaultColumnFilter, width: '150px' },
            { Header: 'User Type', accessor: 'userType', Filter: DefaultColumnFilter, width: '150px' },
            { Header: 'Active', accessor: (row) => (String(row.isActive)), Filter: DefaultColumnFilter, width: '50px' },
            { Header: 'Locked', accessor: (row) => (String(row.isLocked)), Filter: DefaultColumnFilter, width: '50px' },
            {
                Header: 'Actions',
                accessor: 'userId',
                Filter: false,
                Cell: ({ row }) => (
                    <>
                        <IconButton
                            aria-label="delete"
                            onClick={() => handleView(row.original)}
                        >
                            <VisibilityIcon sx={{ color: 'deepskyblue' }} />
                        </IconButton>

                        <IconButton
                            aria-label="delete"
                            onClick={() => handleDelete(row.original)}
                        >
                            <DeleteIcon sx={{ color: 'red' }} />
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
                    Users
                </Typography>
                <div style={{ position: 'absolute', top: 5, right: 10 }}>
                    <Button variant="contained" color="error" onClick={handleAddUser} sx={{ fontWeight: 'bold' }}>
                        <PersonAddIcon /> Create User
                    </Button>
                </div>
            </Paper>

            <AdminTable data={allUsers} columns={columns} forwardUrl={'/user'} />
            <Dialog open={requestConfirm} onClose={handleCancel}>
                <DialogTitle align='center'>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteUser} color="primary">
                        Yes
                    </Button>
                    <Button onClick={handleCancel} color="error">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer />
        </Container>
    );
}

export default ViewUsers;
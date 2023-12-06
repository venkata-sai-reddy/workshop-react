import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { CircularProgress, TextField, Typography } from '@mui/material';
import {
    ToastContainer,
    toast,
} from 'react-toastify';
import { useNavigate } from 'react-router';
import { changePassword } from '../../../store/actions/UserActions';
import { sessionUnAuthCheck } from '../../../utils/Common';

const ChangePass = ({ open, handleClose }) => {

    const [tempPassword, setTempPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);
    const navigate = useNavigate();
  
    const handleChangePassword = async () => {
      setIsUpdating(true)
      try {
        const data = {
          'currentPassword': tempPassword,
          'createPassword': newPassword,
          'confirmPassword': confirmPassword
        }
        const response = await changePassword(data);
        if (response.data === true) {
          toast.success('Password Changed Successfully!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            closeButton: false,
            draggable: false
          });
          setIsUpdating(false);
          handleClose();
        } else {
          toast.error('Failed to Update Password', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            closeButton: false,
            pauseOnHover: true,
            draggable: false
          });
          setIsUpdating(false);
          handleClose();
        }
      } catch (error) {
        console.error('Error Changing Password :', error);
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
        handleClose();
      }
    };

    const handleCancelChangePassword = () => {
      setTempPassword('');
      setNewPassword('');
      setConfirmPassword('');
      handleClose();
    };

    return open && (
        <Dialog open={open} onClose={false} maxWidth="md" fullWidth PaperProps={{ style: { minWidth: '300px' } }}>
            <DialogTitle><Typography variant="h6">Change Password</Typography></DialogTitle>
            <DialogContent>
                <TextField
                    label="Temporary Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={tempPassword}
                    onChange={(e) => setTempPassword(e.target.value)}
                />
                <TextField
                    label="New Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleChangePassword}>
                    Save Password
                </Button>
                <Button variant="contained" color="error" onClick={handleCancelChangePassword}>
                    Cancel
                </Button>
            </DialogActions>
            <Dialog open={isUpdating} >
                <DialogContent>
                    <CircularProgress size={100} thickness={4} style={{ color: 'red' }} />
                </DialogContent>
            </Dialog>
            <ToastContainer />
        </Dialog>
    );
};

export default ChangePass;

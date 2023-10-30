// ChangePassword.jsx
import React, { useState } from 'react';
import { TextField, Divider, Button, Typography, Box, Paper } from '@mui/material';

const ChangePassword = ({ handleClose }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    // Add your logic to handle the change password action
    alert(`Old Password: ${oldPassword}\nNew Password: ${newPassword}\nConfirm Password: ${confirmPassword}`);
    // Reset the password fields
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    handleClose(); // Close the ChangePassword section
  };

  const handleCancelChangePassword = () => {
    // Reset the password fields and close the ChangePassword section
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    handleClose();
  };

  return (
    <Box p={2}>
      <Paper elevation={3} style={{ padding: 20, textAlign: 'center' }}>
        <Typography variant="h6">Change Password</Typography>
        <TextField
          label="Old Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
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
        <Divider style={{ margin: '20px 0' }} />
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleChangePassword}>
            Save Password
          </Button>
          <Button variant="contained" color="error" onClick={handleCancelChangePassword}>
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChangePassword;

// ProfilePage.jsx
import React from 'react';
import {
  Avatar,
  Typography,
  Paper,
  Chip,
  Divider,
  Grid,
  Button,
  Box,
} from '@mui/material';

import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import EditIcon from '@mui/icons-material/Edit';

const ProfilePage = ({ user, isPasswordShow, handleShowPassword }) => {
  const { firstName, lastName, emailId, phoneNumber, userType, skills } = user;

  return (
    <Box p={2}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item minWidth={'650px'} xs={12} md={6}>
          <Paper elevation={3} style={{ padding: 20, textAlign: 'center', position: 'relative' }}>
            {/* <Button
              style={{ position: 'absolute', top: 10, right: 10 }}
              startIcon={<EditIcon />}
              onClick={() => console.log('Edit clicked')}
            >
              Edit
            </Button> */}
            {isPasswordShow ? (
              <>
                <Avatar alt={firstName} sx={{ width: 150, height: 150, margin: 'auto' }} />
                <Typography variant="h4" gutterBottom>
                  {`${firstName} ${lastName}`}
                </Typography>
              </>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Avatar alt={firstName} sx={{ width: 100, height: 100, marginRight: '20px' }} />
                  <div style={{ textAlign: 'left' }}>
                    <Typography variant="h4" gutterBottom>
                      {`${firstName} ${lastName}`}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                      <WorkOutlineOutlinedIcon /> {userType}
                    </Typography>
                  </div>
                </div>
              </>
            )}
            <Divider style={{ margin: '20px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Typography variant="body1">
                <EmailOutlinedIcon /> {emailId}
              </Typography>
              <Typography variant="body1" style={{ marginLeft: '20px' }}>
                <PhoneAndroidOutlinedIcon /> {phoneNumber}
              </Typography>
            </div>
            <Divider style={{ margin: '20px 0' }} />
            {/* Skills */}
            
            <Box display="flex" justifyContent="center">
            <Typography variant="h6">Skills:</Typography>
            {skills.map((skill) => (
                <Chip
                  key={skill.skillId}
                  label={skill.skillName}
                  color={skill.status === 'Approved' ? 'primary' : 'default'}
                  style={{ margin: 5 }}
                />
              ))}
            </Box>
            {/* Change Password button */}
            {!isPasswordShow && (
              <>
                <Divider style={{ margin: '20px 0' }} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleShowPassword}
                >
                  Change Password
                </Button>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;

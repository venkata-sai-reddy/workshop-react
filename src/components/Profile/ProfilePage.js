import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Chip,
  Divider,
  Grid,
  Button,
  Box,
  IconButton,
  TextField,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import EditIcon from '@mui/icons-material/Edit';
import './Profile.css';
import { LoadingPage } from '../Loading/Loading';
import { getSkills } from '../../store/actions/AdminActions';
import { ToastContainer, toast } from 'react-toastify';
import { updateUserProfile } from '../../store/actions/UserActions';
import { noSpaceFieldValidation, numericFieldValidation, sessionUnAuthCheck, textFieldValidation } from '../../utils/Common';
import { useNavigate } from 'react-router';

const ProfilePage = ({ user, isPasswordShow, handleShowPassword }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userProf, setUserProf] = useState(user);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [sysSkills, setSysSkills] = useState();
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    setOpenSaveDialog(true);
  }

  const handleSaveConfirmation = async () => {

    setOpenSaveDialog(false);
    setIsUpdating(true);
    try {
      const response = await updateUserProfile(userProf);
      if (response.data === true) {
        toast.success('Profile Updated Successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          closeButton: false,
          draggable: false
        });
        setIsUpdating(false);
        setIsEditMode(false);
      } else {
        toast.error('Failed to Update Profile', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          closeButton: false,
          pauseOnHover: true,
          draggable: false
        });
        setIsUpdating(false);
        setUserProf(user);
        setIsEditMode(false);
      }
    } catch (error) {
      console.error('Error Updating Profile :', error);
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
      setUserProf(user);
      setIsEditMode(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {

    const fetchSkills = async () => {
      try {
        const skills = await getSkills();
        setSysSkills(skills.data);
        setIsEditMode(true)
        setIsLoading(false);
      } catch (error) {
        console.error('Error : ', error);
        setIsLoading(false);
      }
    };

    if (isLoading) {
      fetchSkills();
    }

  })

  const handleEditProfile = () => {
    setIsLoading(true);
  }

  const handleChange = (name, value) => {
    if (name === 'skills') {
      if (value.length !== 0) {
        const userSkil = value.pop()
        if (typeof (userSkil) === 'object') {
          value.push(userSkil);
        } else {
          const skil = { 'skillName': userSkil }
          value.push(skil)
        }
      }
    }
    setUserProf({
      ...userProf,
      [name]: value,
    });
  }

  const handleCancel = () => {
    setIsEditMode(false);
    setOpenSaveDialog(false);
    setUserProf(user);
  }

  return isLoading ? <LoadingPage /> : (
    <Box p={2} className="profile-page" >
      <Grid container spacing={3} justifyContent="center">
        <Grid item minWidth={'650px'} xs={12} md={6}>
          <Card elevation={3}>
            <CardHeader style={{ position: 'relative' }}
              title={
                <div className='user-prof-avatar' >
                  <div style={{ position: 'absolute', top: 10, right: 10 }}>
                    {!isEditMode && (
                      <IconButton aria-label="edit" automationId='user_prof_edit_icon' onClick={handleEditProfile} title='Edit Profile'>
                        <EditIcon />
                      </IconButton>
                    )}
                    {isEditMode && (
                      <>
                        <IconButton color="primary" automationId='user_prof_save_icon' aria-label="save" onClick={handleUpdateProfile} title='Update'>
                          <SaveIcon />
                        </IconButton>
                        <IconButton color="error" automationId='user_prof_cancel_icon' aria-label="cancel" onClick={handleCancel} title='Cancel'>
                          <ClearIcon />
                        </IconButton>
                      </>
                    )}


                  </div>
                  <Avatar automationId = 'user_prof_avatar' alt={userProf.firstName} sx={{ width: 100, height: 100, marginRight: '20px' }} />
                </div>
              }
            >
            </CardHeader>
            <CardContent className='profile-content'>
              {isEditMode ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px', width: '-webkit-fill-available' }}>
                    <TextField
                      name="firstName"
                      variant="outlined"
                      fullWidth
                      id="user_prof_first_name"
                      onInput={(e)=>textFieldValidation(e)}
                      inputProps={{ automationId: 'edit_user_prof_first_name' }}
                      label="First Name"
                      style={{ paddingLeft: '10px', paddingRight: '10px' }}
                      value={userProf.firstName}
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                    <TextField
                      name="lastName"
                      variant="outlined"
                      fullWidth
                      id="user_prof_last_name"
                      onInput={(e)=>textFieldValidation(e)}
                      inputProps={{ automationId: 'edit_user_prof_last_name' }}
                      label="last Name"
                      style={{ paddingLeft: '10px', paddingRight: '10px' }}
                      value={userProf.lastName}
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                  </div>
                </>) : (
                <>
                  <Typography variant="h4" className='user-prof-name' automationId='user_prof_name' gutterBottom>
                    {`${userProf.firstName} ${userProf.lastName}`}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" automationId='user_prof_type' className='user-prof-type' gutterBottom>
                    <WorkOutlineOutlinedIcon /> {userProf.userType}
                  </Typography>
                </>
              )}
              <Divider className="user-prof-divider" style={{ margin: '20px 0' }} />

              {isEditMode ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '-webkit-fill-available' }}>
                    <TextField
                      name="emailId"
                      variant="outlined"
                      id="user_prof_email_id"
                      fullWidth
                      style={{ paddingLeft: '10px', paddingRight: '10px' }}
                      inputProps={{ automationId: 'edit_user_prof_email_id' }}
                      onInput={(e)=>noSpaceFieldValidation(e)}
                      label="Email Id"
                      value={userProf.emailId}
                      disabled
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                    <TextField
                      name="phoneNumber"
                      variant="outlined"
                      id="user_prof_phone_number"
                      onInput={(e)=>numericFieldValidation(e)}
                      fullWidth
                      style={{ paddingLeft: '10px', paddingRight: '10px' }}
                      inputProps={{ automationId: 'edit_user_prof_phone_number' }}
                      label="Phone Number"
                      value={userProf.phoneNumber}
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                  </div>
                </>) : (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <Typography variant="body1" className="user-prof-email" automationId='user_prof_email_id'>
                    <EmailOutlinedIcon /> {userProf.emailId}
                  </Typography>
                  <Typography variant="body1" className='user-prof-phone' style={{ marginLeft: '20px' }} automationId='user_prof_phone'>
                    <PhoneAndroidOutlinedIcon /> {userProf.phoneNumber}
                  </Typography>
                </div>
              )}


              {(isEditMode && userProf.userType !== 'ADMIN') ? (
                <>
                  <Divider className="user-prof-divider" style={{ margin: '20px 0' }} />
                  <Autocomplete
                    className="edit_user_prof_skills"
                    multiple
                    fullWidth
                    id='skills'
                    componentName="skills"
                    options={sysSkills}
                    getOptionLabel={(option) => option.skillName}
                    getOptionSelected={(option, value) => option.skillId === value.skillId}
                    value={userProf.skills}
                    freeSolo
                    onChange={(e, newValue) => {
                      handleChange('skills', newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant="standard"
                        id="edit_user_prof_skills"
                        inputProps={{ automationId: 'edit_user_prof_skills' }}
                        {...params}
                        onInput={(e)=>textFieldValidation(e)}
                        label="Skills"
                        fullWidth
                      />
                    )}
                  />
                </>) :
                (<>
                  {
                    userProf.skills.length !== 0 &&
                    <>
                      <Divider className="user-prof-divider" style={{ margin: '20px 0' }} />
                      <Typography variant="h6" className='user-prof-skills' automationId='user_prof_skills'>Skills:
                        {userProf.skills.map((skill) => (
                          <Chip
                            key={skill.skillId}
                            label={skill.skillName}
                            color={skill.status === 'Approved' ? 'primary' : 'default'}
                            style={{ margin: 5 }}
                          />
                        ))}
                      </Typography>

                    </>
                  }
                </>
                )
              }

              {!isPasswordShow && (
                <>
                  <Divider className="user-prof-divider" style={{ margin: '20px 0' }} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleShowPassword}
                    className='user-prof-change-pass'
                    automationId='user_prof_change_pass_btn'
                  >
                    Change Password
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={openSaveDialog} onClose={handleCancel}>
        <DialogTitle align='center' automationId='edit_user_prof_confrim_title'>Confirm Changes</DialogTitle>
        <DialogContent>
          <DialogContentText automationId='edit_user_prof_confrim_text'>
            Are you sure you want to save the changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button automationId='edit_user_prof_confrim_btn' onClick={handleSaveConfirmation} color="primary">
            Yes
          </Button>
          <Button automationId='edit_user_prof_cancel_btn' onClick={handleCancel} color="error">
            No
          </Button>

        </DialogActions>
      </Dialog>
      <Dialog open={isUpdating} >
        <DialogContent>
          <CircularProgress size={100} thickness={3} style={{color:'red'}}/>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default ProfilePage;

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
    Switch,
    FormControlLabel,
    Select,
    MenuItem,
} from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';
import '../../Profile/Profile.css'
import { LoadingPage } from '../../Loading/Loading';
import { generateTemporaryPassword, getSkills } from '../../../store/actions/AdminActions';
import { ToastContainer, toast } from 'react-toastify';
import { noSpaceFieldValidation, numericFieldValidation, sessionUnAuthCheck, textFieldValidation } from '../../../utils/Common';
import { useNavigate } from 'react-router';
import { updateUserProfile } from '../../../store/actions/AdminActions';
import { USER_TYPES } from '../../../utils/CommonMessages';

const UserProfilePage = ({ user }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [userProf, setUserProf] = useState(user);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [confirmGenerate, setConfirmGenerate] = useState(false);
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

        const generatePassword = async () => {
            try {
                const response = await generateTemporaryPassword(userProf);
                if (response.data === true) {
                    toast.success('Pasword Generated Successfully!', {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        closeButton: false,
                        draggable: false
                    });
                    setIsGenerating(false);
                } else {
                    toast.error('Failed to generate password', {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        closeButton: false,
                        pauseOnHover: true,
                        draggable: false
                    });
                    setIsGenerating(false);
                }
            } catch (error) {
                console.error('Error Generating Password :', error);
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
                setIsGenerating(false);
            }
        };

        if (isLoading) {
            fetchSkills();
        }

        if (isGenerating) {
            generatePassword();
        }
    })

    const handleEditProfile = () => {
        setIsLoading(true);
    }

    const handleGeneratePassword = () => {
        setConfirmGenerate(true);
    }

    const handleGenerateConfirmation = () => {
        setConfirmGenerate(false);
        setIsGenerating(true);
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
        console.log(userProf);
    }

    const handleCancel = () => {
        setIsEditMode(false);
        setOpenSaveDialog(false);
        setConfirmGenerate(false);
        setIsGenerating(false);
        setUserProf(user);
    }

    return isLoading ? <LoadingPage /> : (
        <Box p={2} className="profile-page" automationId="admin_view_user_prof_page">
            <Grid container spacing={3} xs={{ width: '100%' }} justifyContent="center">
                <Grid item minWidth={'650px'} xs={12} md={6}>
                    <Card elevation={3}>
                        <CardHeader style={{ position: 'relative' }}
                            title={
                                <div className='user-prof-avatar' >
                                    <div style={{ position: 'absolute', top: 10, right: 10 }}>
                                        {!isEditMode && (
                                            <IconButton automationId="admin_up_edit_icon" aria-label="edit" onClick={handleEditProfile} title='Edit User Profile'>
                                                <EditIcon />
                                            </IconButton>
                                        )}
                                        {isEditMode && (
                                            <>
                                                <IconButton automationId="admin_up_save_icon" color="primary" aria-label="save" onClick={handleUpdateProfile} title='Update'>
                                                    <SaveIcon />
                                                </IconButton>
                                                <IconButton automationId="admin_up_cancel_icon" color="error" aria-label="cancel" onClick={handleCancel} title='Cancel'>
                                                    <ClearIcon />
                                                </IconButton>
                                            </>
                                        )}


                                    </div>
                                    <Avatar automationId="admin_up_avatar" alt={userProf.firstName} sx={{ width: 100, height: 100, marginRight: '20px' }} />
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
                                            onInput={(e) => textFieldValidation(e)}
                                            inputProps={{ automationId: 'admin_edit_user_prof_first_name' }}
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
                                            onInput={(e) => textFieldValidation(e)}
                                            inputProps={{ automationId: 'admin_edit_user_prof_last_name' }}
                                            label="last Name"
                                            style={{ paddingLeft: '10px', paddingRight: '10px' }}
                                            value={userProf.lastName}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        />
                                    </div>
                                </>) : (
                                <>
                                    <Typography variant="h4" className='user-prof-name' automationId="admin_up_user_name" gutterBottom>
                                        {`${userProf.firstName} ${userProf.lastName}`}
                                    </Typography>
                                    <Typography automationId="admin_up_user_type" variant="subtitle1" color="textSecondary" className='user-prof-type' gutterBottom>
                                        <WorkOutlineOutlinedIcon /> {userProf.userType}
                                    </Typography>
                                    <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '-webkit-fill-available' }}>
                                        <Typography automationId="admin_up_is_active" sx={{ color: userProf.isActive ? 'green' : 'red' }}>
                                            <CircleIcon fontSize='small' sx={{ color: userProf.isActive ? 'green' : 'red' }} />{'Active'}
                                        </Typography>
                                        <Typography automationId="admin_up_is_locked" sx={{ color: userProf.isLocked ? 'red' : 'darkgray' }}>
                                            <CircleIcon fontSize='small' sx={{ textAlign: 'center', color: userProf.isLocked ? 'red' : 'darkgray' }} />{'Locked'}
                                        </Typography>
                                    </div>
                                </>
                            )}

                            {isEditMode && (
                                <>
                                    <Divider className="user-prof-divider" style={{ margin: '20px 0' }} />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '-webkit-fill-available' }}>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={userProf.userType}
                                            label="User Type"
                                            name='userType'
                                            style={{ paddingLeft: '10px', paddingRight: '10px', marginLeft: '10px' }}
                                            inputProps={{ automationId: 'admin_edit_user_prof_user_type' }}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                            sx={{ width: '280px', color: 'black' }}
                                        >
                                            {USER_TYPES.map((role) => (
                                                <MenuItem key={role} value={role}>
                                                    {role}
                                                </MenuItem>
                                            ))}
                                        </Select>

                                        <FormControlLabel label="Active" labelPlacement="start" sx={{ color: userProf.isActive ? 'green' : 'red' }}
                                            control={
                                                <Switch
                                                    checked={userProf.isActive}
                                                    onChange={(e) => handleChange(e.target.name, !userProf.isActive)}
                                                    name="isActive"
                                                    inputProps={{ automationId: 'admin_edit_user_prof_is_active' }}
                                                    color="primary"
                                                />
                                            }
                                        />

                                        <FormControlLabel label="Locked" labelPlacement="start" sx={{ color: userProf.isLocked ? 'red' : 'darkgray' }}
                                            control={
                                                <Switch
                                                    checked={userProf.isLocked}
                                                    onChange={(e) => handleChange(e.target.name, !userProf.isLocked)}
                                                    name="isLocked"
                                                    inputProps={{ automationId: 'admin_edit_user_prof_is_locked' }}
                                                    sx={{ marginRight: '10px', paddingRight: '10px' }}
                                                    color='primary'
                                                />
                                            }
                                        />
                                    </div>
                                </>)
                            }
                            < Divider className="user-prof-divider" style={{ margin: '15px 0' }} />

                            {isEditMode ? (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '-webkit-fill-available' }}>
                                        <TextField
                                            name="emailId"
                                            variant="outlined"
                                            id="user_prof_email_id"
                                            fullWidth
                                            style={{ paddingLeft: '10px', paddingRight: '10px' }}
                                            inputProps={{ automationId: 'admin_edit_user_prof_email_id' }}
                                            label="Email Id"
                                            onInput={(e) => noSpaceFieldValidation(e)}
                                            value={userProf.emailId}
                                            disabled
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        />
                                        <TextField
                                            name="phoneNumber"
                                            variant="outlined"
                                            id="user_prof_phone_number"
                                            fullWidth
                                            style={{ paddingLeft: '10px', paddingRight: '10px' }}
                                            inputProps={{ automationId: 'admin_edit_user_prof_phone_number' }}
                                            label="Phone Number"
                                            value={userProf.phoneNumber}
                                            onInput={(e) => numericFieldValidation(e)}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        />
                                    </div>
                                </>) : (
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                    <Typography variant="body1" className="user-prof-email" automationId="admin_up_email_id">
                                        <EmailOutlinedIcon /> {userProf.emailId}
                                    </Typography>
                                    <Typography variant="body1" className='user-prof-phone' style={{ marginLeft: '20px' }} automationId="admin_up_phone_number">
                                        <PhoneAndroidOutlinedIcon /> {userProf.phoneNumber}
                                    </Typography>
                                </div>
                            )}


                            {isEditMode ? (
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
                                                onInput={(e) => textFieldValidation(e)}
                                                inputProps={{ automationId: 'admin_edit_user_prof_skills' }}
                                                {...params}
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
                                            <Typography variant="h6" className='user-prof-skills' automationId="admin_up_skills">Skills:
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

                            < Divider className="user-prof-divider" style={{ margin: '15px 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '-webkit-fill-available' }} >
                                <Button variant='contained' onClick={handleGeneratePassword} automationId="admin_up_generate_pass_btn">
                                    {isGenerating ? <CircularProgress style={{ color: 'white', height: '25px', width: '25px' }} /> : 'Generate Password'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Dialog open={openSaveDialog} onClose={handleCancel}>
                <DialogTitle align='center' automationId="admin_up_confirm_save_title">Confirm Changes</DialogTitle>
                <DialogContent>
                    <DialogContentText automationId="admin_up_confirm_save_text">
                        Are you sure you want to save the changes?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button automationId="admin_up_confirm_save_btn" onClick={handleSaveConfirmation} color="primary">
                        Yes
                    </Button>
                    <Button automationId="admin_up_confirm_cancel_btn" onClick={handleCancel} color="error">
                        No
                    </Button>

                </DialogActions>
            </Dialog>
            <Dialog open={confirmGenerate} onClose={handleCancel}>
                <DialogTitle align='center' automationId="admin_up_confirm_gen_pass_title">Confirm Generate Password</DialogTitle>
                <DialogContent>
                    <DialogContentText automationId="admin_up_confirm_gen_pass_text">
                        Are you sure you want to generate the password?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button automationId="admin_up_confirm_gen_pass_btn" onClick={handleGenerateConfirmation} color="primary">
                        Yes
                    </Button>
                    <Button automationId="admin_up_confirm_gen_pass_cancel_btn" onClick={handleCancel} color="error">
                        No
                    </Button>

                </DialogActions>
            </Dialog>
            <Dialog open={isUpdating} >
                <DialogContent>
                    <CircularProgress size={100} thickness={3} style={{ color: 'red' }} />
                </DialogContent>
            </Dialog>
            <ToastContainer />
        </Box>
    );
};

export default UserProfilePage;

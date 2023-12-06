import { createUserValidationSchema } from "../../../api/validationSchema";
import { useFormik } from "formik";
import { createUserProfile } from "../../../store/actions/AdminActions";
import { USER_TYPES } from "../../../utils/CommonMessages";
import { Box, Button, Card, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { sessionUnAuthCheck } from "../../../utils/Common";
import { useNavigate } from "react-router";
import './Users.css';

const CreateUserPage = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            emailId: '',
            phoneNumber: '',
            userType: ''
        },
        validationSchema: createUserValidationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        },
    });

    const handleSubmit = async (form) => {
        const data = {
            'firstName': form.firstName,
            'lastName': form.lastName,
            'emailId': form.emailId,
            'phoneNumber': form.phoneNumber,
            'userType': form.userType
        }
        try {
            const response = await createUserProfile(data);
            if (response.data) {
                toast.success('User Successfully Created!', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    closeButton: false,
                    draggable: false
                });
                formik.resetForm();
            } else {
                toast.error('Failed to create user', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    closeButton: false,
                    pauseOnHover: true,
                    draggable: false
                });
            }
        } catch (error) {
            console.error('Error creating user :', error);
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
        }
    }

    return (
        <Box p={2} className="profile-page" automationId="admin_create_user_page">
            <Grid container spacing={3} xs={{ width: '100%' }} justifyContent="center">
                <Grid item minWidth={'650px'} xs={12} md={6}>
                    <Card elevation={3}>
                        <CardHeader style={{ position: 'relative', textAlign: 'center' }}
                            title={'Create User'}
                        >
                        </CardHeader>
                        <CardContent className='profile-content'>
                            <div id="create_user_container" className="create_user_container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <form className="create_user_container_form"
                                    id='create_user_container_form'
                                    onSubmit={formik.handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="First Name"
                                                type="text"
                                                id="firstName"
                                                className='create_user_form_fields'
                                                name="firstName"
                                                size='small'
                                                inputProps={{ automationId: 'create_user_first_name' }}
                                                value={formik.values.firstName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                                helperText={formik.touched.firstName && formik.errors.firstName}
                                                required
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Last Name"
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                className='create_user_form_fields'
                                                size='small'
                                                inputProps={{ automationId: 'create_user_last_name' }}
                                                value={formik.values.lastName}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                                helperText={formik.touched.lastName && formik.errors.lastName}
                                                required
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>

                                    <TextField
                                        name="emailId"
                                        variant="outlined"
                                        id="user_prof_email_id"
                                        className='create_user_form_fields'
                                        inputProps={{ automationId: 'create_user_email_id' }}
                                        label="Email Id"
                                        size='small'
                                        required
                                        value={formik.values.emailId}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.emailId && Boolean(formik.errors.emailId)}
                                        helperText={formik.touched.emailId && formik.errors.emailId}
                                        fullWidth
                                    />

                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                name="phoneNumber"
                                                variant="outlined"
                                                id="create_user_phone_number"
                                                className='create_user_form_fields'
                                                size='small'
                                                inputProps={{ automationId: 'create_user_phone_number' }}
                                                label="Phone Number"
                                                value={formik.values.phoneNumber}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="user_type_label_id">User Type*</InputLabel>
                                                <Select
                                                    id="create_user_user_type"
                                                    value={formik.values.userType}
                                                    variant="standard"
                                                    required
                                                    labelId="user_type_label_id"
                                                    placeholder="User Type"
                                                    className="create_user_form_fields"
                                                    name='userType'
                                                    inputProps={{ automationId: 'create_user_user_type' }}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    error={formik.touched.userType && Boolean(formik.errors.userType)}
                                                    helperText={formik.touched.userType && formik.errors.userType}

                                                >
                                                    {USER_TYPES.map((role) => (
                                                        <MenuItem key={role} value={role}>
                                                            {role}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        id="create_user_form_submit"
                                        automationId="create_user_form_submit"
                                        style={{ marginTop: '16px' }}
                                    >
                                        Create User
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>

    );
};

export default CreateUserPage;
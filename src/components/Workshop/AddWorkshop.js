import React, { useEffect, useState } from 'react';
import { useForm, useController } from 'react-hook-form';
import {
    TextField,
    Button,
    Grid,
    FormControl,
    Box,
    Typography,
    Autocomplete
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingPage } from '../Loading/Loading';
import { getVenues } from '../../store/actions/AdminActions'
import { saveVenues } from '../../store/reducers/AdminReducers';
import { convertTimetoLocalDateTime, convertToDateFormat, sessionCheck, sessionUnAuthCheck } from '../../utils/Common';
import { createWorkshop } from '../../store/actions/WorkshopActions';
import {
    ToastContainer,
    toast,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToWorkshops } from '../../store/reducers/WorkshopReducers'
import { useNavigate } from 'react-router';

const AddWorkshop = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const userSkills = useSelector((state) => state?.user?.value?.user?.skills)
    const venues = useSelector((state) => state?.admin?.value?.venues)

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const venues = await getVenues();
                dispatch(saveVenues(venues));
                setIsLoading(false);
            } catch (error) {
                console.error("Error : ", error);
                setIsLoading(false);
            }
        };
        if (isLoading && !venues) {
            fetchVenues();
        }
        if (venues) {
            setIsLoading(false);
        }
    })

    const schema = yup.object().shape({
        workshopName: yup.string().required('Title is required'),
        description: yup.string().max(3000, 'Description cannot exceed 3000 characters'),
        selectedSkills: yup.array().typeError('Skills are required').min(1, 'Atleast 1 skill should be selected').required('Skills are required'),
        venue: yup.string().required('Venue is required'),
        workshopDate: yup.date().typeError("Date is required").required('Date is required'),
        startTime: yup.string().required('Start Time is required'),
        endTime: yup.string().required('End time is required').test('is-valid-end-time', 'End time should be after Start time', (value, context) => {
            return isValidEndTime(value, context.parent.startTime);
        })
    });
    const isValidEndTime = (endTime, startTime) => {
        const [endhours, endminutes] = endTime.split(':').map(Number);
        const [starthours, startminutes] = startTime.split(':').map(Number);
        return (endhours * 60 + endminutes) > (starthours * 60 + startminutes);
    };

    const { register, control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const { field, fieldState } = useController({
        name: 'selectedSkills',
        defaultValue: [],
        control,
    });

    const onSubmit = async (data) => {
        if (data.capacity === "" || data.capacity === null || data.capacity === undefined) {
            data.capacity = 30;
        }
        data.capacity = isNaN(data.capacity) ? 30 : Number.parseInt(data.capacity);

        data.startTime = convertTimetoLocalDateTime(data.workshopDate, data.startTime);
        data.endTime = convertTimetoLocalDateTime(data.workshopDate, data.endTime);
        data.workshopDate = convertToDateFormat(data.workshopDate).split("T")[0];
        console.log(data);
        try {
            const response = await createWorkshop(data);
            dispatch(addToWorkshops(response));
            toast.success('Workshop Created successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                closeButton: false,
                draggable: false
            });
            reset();
        } catch (error) {
            console.error('Error creating Workshop :', error);
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
    };

    const clearForm = () => {
        reset();
    };
    console.log(errors);
    return isLoading ? <LoadingPage /> : (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box p={2}>
                <Typography automationId='create_workshop_title_page' id='create_workshop_title_page' variant="h6" gutterBottom>
                    Create Workshop
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                id='create_workshop_title_field'
                                inputProps={{ automationId: 'create_workshop_title_field' }}
                                label="Workshop Title *"
                                {...register('workshopName', { required: 'Title is required' })}
                                error={!!errors.workshopName}
                                helperText={errors.workshopName?.message}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                id='create_workshop_description_field'
                                inputProps={{ automationId: 'create_workshop_description_field' }}
                                label="Description"
                                multiline
                                rows={6}
                                {...register('description', {
                                    maxLength: {
                                        value: 3000,
                                        message: 'Description cannot exceed 3000 characters',
                                    },
                                })}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xxs={12} xs={6} sm={5} md={4}>
                        <FormControl fullWidth>
                            <Autocomplete
                                className='create_workshop_autocomplete'
                                multiple
                                id="selectedSkills"
                                options={userSkills}
                                getOptionLabel={(option) => option.skillName}
                                getOptionSelected={(option, value) => option.skillId === value.skillId}
                                value={field.value}
                                onChange={(e, newValue) => {
                                    field.onChange(newValue);
                                }}
                                onBlur={field.onBlur}
                                renderInput={(params) => (
                                    <TextField
                                        id='create_workshop_skills_field'
                                        inputProps={{ automationId: 'create_workshop_skills_field' }}
                                        {...params}
                                        label="Skills *"
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        fullWidth
                                    />
                                )}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xxs={12} xs={6} sm={5} md={4}>
                        <FormControl fullWidth>
                            <Autocomplete
                                className='create_workshop_autocomplete'
                                id="venue"
                                options={venues}
                                getOptionLabel={(option) => option.venueName}
                                getOptionSelected={(option, value) => option.venueId === value}
                                {...register('venue', { required: 'Venue is required' })}
                                renderInput={(params) => (
                                    <TextField {...params} id='create_workshop_venue_field'
                                        label="Venue" name="venue" fullWidth />
                                )}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xxs={12} xs={6} sm={2} md={4}>
                        <FormControl fullWidth>
                            <TextField
                                id='create_workshop_capacity_field'
                                inputProps={{ automationId: 'create_workshop_capacity_field' }}
                                label="Capacity"
                                type="number"
                                {...register('capacity')}
                                error={!!errors.capacity}
                                helperText={errors.capacity?.message}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xxs={12} xs={6} sm={4} md={4}>
                        <FormControl fullWidth>
                            <TextField
                                id='create_workshop_date_field'
                                label="Workshop Date *"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...register('workshopDate', { required: 'Date is required' })}
                                inputProps={{ automationId: 'create_workshop_date_field', min: new Date().toISOString().split('T')[0] }}
                                error={!!errors.workshopDate}
                                helperText={errors.workshopDate?.message}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xxs={12} xs={6} sm={4} md={4}>
                        <FormControl fullWidth>
                            <TextField
                                id='create_workshop_start_time_field'
                                inputProps={{ automationId: 'create_workshop_start_time_field' }}
                                label="Start Time *"
                                type="time"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...register('startTime', {
                                    required: 'Start Time is required',
                                })}
                                error={!!errors.startTime}
                                helperText={errors.startTime?.message}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xxs={12} xs={6} sm={4} md={4}>
                        <FormControl fullWidth>
                            <TextField
                                id='create_workshop_end_time_field'
                                inputProps={{ automationId: 'create_workshop_end_time_field' }}
                                label="End Time *"
                                type="time"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...register('endTime', { required: 'End Time is required' })}
                                error={!!errors.endTime}
                                helperText={errors.endTime?.message}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item md={12} className='workshop_buttons'>
                        <Button automationId='create_workshop_create_button' className='workshop_submit_button' id='create_workshop_create_button' type="submit" variant="contained" color="primary" sx={{ mr: 2 }} >
                            Create
                        </Button>
                        <Button automationId='create_workshop_clear_button' className='workshop_clear_button' id='create_workshop_clear_button' type="button" variant="outlined" color="error" onClick={clearForm}>
                            Clear
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <ToastContainer />
        </form>
    );
};

export default AddWorkshop;

import React, { useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'; // Import useHistory
import './Login.css';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField, Typography, Button } from '@material-ui/core';
import { doLogin } from '../../../store/actions/PreLoginActions'
import { useDispatch } from 'react-redux';
import { saveUser } from '../../../store/reducers/UserReducers'

export const LoginComponent = () => {
    const schema = yup.object().shape({
        emailId: yup.string().email("Please enter valid email id").required("Please enter username"),
        password: yup.string().min(8, "Password must be at least 8 characters").required("Please enter password")
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [responseError, setResponseError] = useState({});
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            const response = await doLogin(data);
            dispatch(saveUser(response));
            navigate("/home");
        } catch (error) {
            console.error('Error logging in:', error);
            setResponseError(error.response.data);
            setTimeout(() => {
                setResponseError({});
            }, 10000);
        }
    };

    return (
        <Container fluid id="login_container" className="login_container" automationId="login_container">
            <Row id="login_container_header" className="login_container_header" automationId="login_container_header">
                <Typography>Login, please enter your email Id & password</Typography>
            </Row>
            <Row id="login_container_errors" className="login_container_errors" automationId="login_container_errors">
                <Typography align="center" color="error" >{responseError?.message}</Typography>
            </Row>
            <Container fluid id="login_container_form" className="login_contianer_form" automationId="login_container_form">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <TextField
                        required
                        variant="outlined"
                        id="login_form_email"
                        className="login_form_fields"
                        automationId="login_form_email_id"
                        label="Email Id"
                        placeholder="useremail@email.com"
                        fullWidth
                        size='small'
                        onBlur={() => { setResponseError({}) }}
                        error={!!errors.emailId}
                        helperText={errors.emailId?.message}
                        {...register("emailId")}
                    />
                    <TextField
                        required
                        variant="outlined"
                        id="login_form_password"
                        className="login_form_fields"
                        automationId="login_form_password"
                        label="Password"
                        type='password'
                        size='small'
                        placeholder="********"
                        fullWidth
                        onBlur={() => { setResponseError({}) }}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        {...register("password")}
                    />
                    <div id="login_form_button">
                        <Button type="submit" fullWidth variant="contained" color="primary" id="login_form_signin" automationId="login_form_signin">Sign In</Button>
                    </div>
                </form>
            </Container>
            <Row id="login_container_links" className="login_container_links" automationId="login_container_links">
                <Col >
                    <Link to={'/signup'}>SignUp</Link>
                </Col>
                <Col >
                    <Link to={'/forget-password'}>Forget Password?</Link>
                </Col>
            </Row>
        </Container>
    );
};
// Login.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { adminLogin } from '../../Store/slices/authSlice';
import { Button, TextField, Typography, Container } from '@mui/material';
import accountService from '../../Services/account-service';
import { useNavigate } from 'react-router-dom';
import { Routing } from '../../Routes/Routing';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async(values) => {
        try{
            const response = await accountService.loginUser(values);
            console.log('Login Response:', response);
            dispatch(adminLogin(response.data));
            localStorage.setItem('token', response.accessToken);
            navigate(Routing.Home)
        }
        catch (error) {
            console.log('Login Error:', error);
        }
     
    }

    return (
        <Container maxWidth="xs" className="mt-10">
            <Typography variant="h4" align="center" className="mb-4">
                Login
            </Typography>
            <Formik
                initialValues={{ username: 'emilys', password: 'emilyspass' }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    handleLogin(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-4">
                            <Field
                                as={TextField}
                                label="Username"
                                name="username"
                                fullWidth
                                variant="outlined"
                                className="mb-2"
                                helperText={<ErrorMessage name="username" />}
                                error={Boolean(<ErrorMessage name="username" />)}
                            />
                        </div>
                        <div className="mb-4">
                            <Field
                                as={TextField}
                                label="Password"
                                name="password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                className="mb-2"
                                helperText={<ErrorMessage name="password" />}
                                error={Boolean(<ErrorMessage name="password" />)}
                            />
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default Login;

/* eslint-disable import/order */
// eslint-disable-next-line import/order
import React from 'react';
// eslint-disable-next-line import/order
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import loginLogo from '../../assets/login-logo.svg';
import { login } from './AuthenSlice';
import axiosClient, { updateAxiosAccessToken } from 'api/axiosClient';
import { setCookie } from 'utils/Cookie';

import './style.scss';
export default function SignIn() {
    const nextPage = new URLSearchParams(useLocation().search).get('next');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    console.log(nextPage);
    
    
    const handleLogin = async () => {
        try {
            const response = await axiosClient.post(`user/login`, {
                username: username,
                password: password
            });
            dispatch(login(response.data));
            updateAxiosAccessToken(response.data.token);
            setCookie('loginUser', JSON.stringify(response.data), 1);
            nextPage!==null ? navigate(`${nextPage}`) : navigate(`/admin/home`);
        } catch (error) {
            console.error(error);

        }
    };

    return (
        <div className="signin-screen d-flex align-items-center w-100">
            <div className="col">
                <img src={loginLogo} className='signin-screen-logo' alt="logo" />
            </div>
            <div className="col d-flex justify-content-center aligh-items-center">
                
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>User name</Form.Label>
                        <Form.Control type="text" placeholder="Enter user name" onChange={(e) => setUsername(e.target.value)} />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <a href='/sign-up' className='text-end text-primary w-100 d-inline-block'>Are you not have account ?</a>


                    <Button className='mt-3' variant="primary" type='submit'>
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
}
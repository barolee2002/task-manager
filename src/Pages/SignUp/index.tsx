/* eslint-disable import/order */
// eslint-disable-next-line import/order
import React from 'react';
// eslint-disable-next-line import/order
import { Button, Form } from 'react-bootstrap';

// import axiosClient from 'api/axiosClient';

import { useNavigate } from 'react-router';

import loginLogo from '../../assets/login-logo.svg';
import axiosClient from 'api/axiosClient';
import { user } from 'Type/Type';
// import { user } from 'redux/selector';

type errorMessage = {
    [key: string]: string;
    name: string,
    username: string,
    password: string,
    confirmPassword: string,
}
export default function SignUp() {
    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [newUser, setNewuser] = React.useState<user>({} as user);
    const [errorMessage, setErrorMessage] = React.useState<errorMessage>({} as errorMessage);
    const handleSetErrorMessage = (title: string, message: string) => {
        setErrorMessage({
            ...errorMessage,
            [title]: message
        });
    };
    const handleChangeUserInfor = (title: string, value: unknown) => {
        setNewuser(() => {
            return {
                ...newUser,
                [title]: value
            };

        });
    };
    const handleCheckSuccessUpdate = () => {
        for (const key in errorMessage) {
            if (errorMessage[key] !== null && errorMessage[key] !== '') {
                return false;
            }
        }
        return true;
    };

    const handleRegister = async () => {
        try {
            await axiosClient.post(`user/admin`, {
                ...newUser
            });
            navigate(`/sign-in`);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="signin-screen d-flex align-items-center w-100">
            <div className="col">
                <img src={loginLogo} className='signin-screen-logo' alt="logo" />
            </div>
            <div className="col d-flex justify-content-center aligh-items-center">
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nguyen Van A"
                            value={newUser.name}
                            onChange={(e) => handleChangeUserInfor('name', e.target.value)}
                            onBlur={() => {
                                newUser.name === '' ? handleSetErrorMessage('name', 'Please enter this field') : handleSetErrorMessage('name', '');
                            }}
                            onFocus={() => handleSetErrorMessage('name', '')}
                        />
                        <p className="error-message">{errorMessage.name}</p>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="nguyen"
                            value={newUser.username}
                            onChange={(e) => handleChangeUserInfor('username', e.target.value)}
                            onBlur={() => {
                                newUser.username === '' ? handleSetErrorMessage('username', 'Please enter this field') : handleSetErrorMessage('username', '');
                            }}
                            onFocus={() => handleSetErrorMessage('username', '')}
                        />
                        <p className="error-message">{errorMessage.username}</p>
                    </Form.Group>
                    <div className="row">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={newUser.password}
                                placeholder="Enter new password"
                                onChange={(e) => handleChangeUserInfor('password', e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-0" controlId="formBasicEmail">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmPassword}
                                placeholder="Confirm new password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onBlur={(e) => {
                                    newUser.password === e.target.value ? handleSetErrorMessage('confirmPassword', '') : handleSetErrorMessage('confirmPassword', 'Password is incorrect');
                                }}
                                onFocus={() => handleSetErrorMessage('confirmPassword', '')}
                            />
                            <p className="error-message">{errorMessage.confirmPassword}</p>
                        </Form.Group>

                    </div>
                    <a href='/sign-in' className='text-end text-primary w-100 d-inline-block'>Are you have account ?</a>
                    <div className="mt-3">
                        <Button variant="primary" onClick={() => {
                            if (handleCheckSuccessUpdate()) {
                                handleRegister();
                            }

                        }}>
                            Register
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    );
}
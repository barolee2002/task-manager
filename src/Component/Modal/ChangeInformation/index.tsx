/* eslint-disable no-unused-vars */
import React from "react";

import { Button, Form, Modal } from 'react-bootstrap';

import { user } from "Type/Type";

import './style.scss';
interface Props {
    show: boolean;
    onClose: () => void;
    user: user;
    onChangeInfo: (title: string, value: unknown) => void;
    onConfirm: () => void;
}
type errorMessage = {
    [key: string]: string;
    name: string,
    username: string,
    password: string,
    confirmPassword: string,
}
export default function ChangeInformation(props: Props) {
    const { show, onClose, onChangeInfo, onConfirm, user } = props;
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState<errorMessage>({} as errorMessage);
    const handleSetErrorMessage = (title: string, message: string) => {
        setErrorMessage({
            ...errorMessage,
            [title]: message
        });
    };
    const handleCheckSuccessUpdate = () => {
        for( const key in errorMessage) {
            if(errorMessage[key] !== null && errorMessage[key] !== '') {
                return false;
            }
        }
        return true;
    };

    return (
        <React.Fragment>
            <Modal show={show} onHide={() => {
                setErrorMessage({} as errorMessage);
                onClose();
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>Change information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nguyen Van A"
                                value={user.name}
                                onChange={(e) => onChangeInfo('name', e.target.value)}
                                onBlur={() => {
                                    user.name === '' ? handleSetErrorMessage('name', 'Please enter this field') : handleSetErrorMessage('name', '');
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
                                value={user.username}
                                onChange={(e) => onChangeInfo('username', e.target.value)}
                                onBlur={() => {
                                    user.username === '' ? handleSetErrorMessage('username', 'Please enter this field') : handleSetErrorMessage('username', '');
                                }}
                                onFocus={() => handleSetErrorMessage('username', '')}
                            />
                            <p className="error-message">{errorMessage.username}</p>
                        </Form.Group>
                        <div className="row">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={user.password} placeholder="Enter new password" onChange={(e) => onChangeInfo('password', e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={confirmPassword}
                                    placeholder="Confirm new password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onBlur={(e) => {
                                        user.password === e.target.value ? handleSetErrorMessage('confirmPassword', '') : handleSetErrorMessage('confirmPassword', 'Password is incorrect');
                                    }}
                                    onFocus={() => handleSetErrorMessage('confirmPassword', '')}
                                />
                                <p className="error-message">{errorMessage.confirmPassword}</p>
                            </Form.Group>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setErrorMessage({} as errorMessage);
                        onClose();
                    }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        if (handleCheckSuccessUpdate()) {
                            onConfirm();
                            onClose();
                        }

                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

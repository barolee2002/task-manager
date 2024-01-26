import React from 'react';

import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import DefaultLayout from "Component/DefaultLayout";
import ChangeInformation from 'Component/Modal/ChangeInformation';
import { ConfirmModal } from 'Component/Modal/ConfirmModal';
import { user } from 'Type/Type';
import axiosClient from 'api/axiosClient';

import { userSelector } from '../../redux/selector';
import { updateUser } from './accoutSlice';


export default function Account() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const user = useSelector(userSelector);
    const [show, setShow] = React.useState(false);
    const [showConfirm, setShowConfirm] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState<user>({} as user);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`user/${id}`);
                setUserInfo(response.data);
                dispatch(updateUser(response.data));
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);
    const handleChangeUserInfor = (title: string, value: unknown) => {
        setUserInfo(() => {
            return {
                ...userInfo,
                [title]: value
            };

        });
    };
    const handleClose = () => {
        setShow(false);
        setUserInfo(user);
    };
    const handleUpdateInfo = async () => {
        try {
            const response = await axiosClient.put(`user/update/${user.id}`, {
                ...userInfo,
            });
            dispatch(updateUser(response.data));
            userInfo.password !=='' && navigate('/sign-in');
        } catch (e) {
            console.error(e);
        }

    };
    const handleDeleteUser = async () => {
        try {
            await axiosClient.delete(`user/delete/${user.id}`);
            navigate(`/sign-in`);
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <div className="account">
            <DefaultLayout>
                <div className="page-heading">
                    <p>Account</p>
                    <Button className='bg-danger border-danger' onClick={() => setShowConfirm(true)}>Delete account</Button>
                </div>
                <div className="page-content">
                    <div className="user-information">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={user.name} placeholder="Enter user name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>User name</Form.Label>
                            <Form.Control type="text" value={user.username} placeholder="Enter user name" />
                        </Form.Group>

                    </div>
                    <Button onClick={() => setShow(true)}>Change information</Button>
                </div>
                <ChangeInformation user={userInfo} show={show} onClose={handleClose} onChangeInfo={(title: string, value: unknown) => handleChangeUserInfor(title, value)} onConfirm={handleUpdateInfo} />
                <ConfirmModal  show = {showConfirm} modalContent='Are you sure delete this account' onClose={() => setShowConfirm(false)} onConfirm={handleDeleteUser}/>
            </DefaultLayout>
        </div>
    );
}
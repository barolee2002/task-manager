/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React from "react";

import './style.scss';
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { setCookie } from "utils/Cookie";


import { user } from "../../redux/selector";

export default function Sidebar() {
    const navigate = useNavigate();
    const userSelector = useSelector(user);
    const handleLogout = () => {
        setCookie('loginUser', '', 0);
        navigate('/sign-in');
    };
    const menuItems: { item: string, link: string }[] = [
        {
            item: 'Dashboard',
            link: '/admin/dashboard'
        },
        {
            item: 'Account',
            link: `/admin/account/${userSelector.id}`
        }
    ];
    return (
        <React.Fragment>
            <div className="side-bar d-flex">
                <div className="row">
                    <p className="text-center app-name">Task Manager</p>
                    <div className="features-list">
                        <ul className="features-list-group">
                            {
                                menuItems?.map((menuItem, index) => (

                                    <li
                                        className="features-list-group-item"
                                        key={index}
                                        onClick={() => navigate(menuItem.link)}
                                    >{menuItem.item}</li>
                                ))
                            }

                        </ul>
                    </div>
                </div>

                <div className="row">

                    <p className="text-center">Hello {userSelector.name}</p>
                    <div className="d-flex justify-content-center">

                        <Button onClick={handleLogout}>Log out</Button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
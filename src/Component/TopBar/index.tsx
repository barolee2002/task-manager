import { Button, Dropdown } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router';

import { setCookie } from 'utils/Cookie';

import { user } from "../../redux/selector";

import './style.scss';
export default function TopBar() {
    const navigate = useNavigate();
    const userLogin = useSelector(user);
    const handleLogout = () => {
        console.log(1);

        setCookie('loginUser', '', 0);
        navigate('/sign-in');
    };
    return (
        <div className="top-bar">
            <button className='logo-btn' onClick={() => navigate(`/admin/home`)}>

                <h1 className="logo m-0">SHOPPING</h1>
            </button>
            <div className='user'>
                <Button variant="success" onClick={() => navigate(`/admin/cart/${userLogin.id}`)}><i className="bi bi-cart"></i></Button>
                {userLogin.id !== undefined ?
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <div className="avatar" >
                                <i className="bi bi-person-circle"></i>
                                <p className='m-0'>{userLogin.name}</p>
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => navigate(`/admin/account/${userLogin.id}`)}>Account</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> :
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <div className="avatar" >
                                <i className="bi bi-person-circle"></i>
                                <p className='m-0'>Login/Register</p>
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => navigate(`/sign-in`)}>Login</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate(`/sign-up`)}>Register</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>}
            </div>
        </div>
    );
}
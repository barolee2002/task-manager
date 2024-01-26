// import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { login } from 'Pages/SignIn/AuthenSlice';
import { getCookie } from 'utils/Cookie';
interface PrivateRouteProps {
    children: JSX.Element
}

const PrivateRoute = ({
    children
}: PrivateRouteProps) => {
    const dispatch = useDispatch();
    const user = getCookie('loginUser');
    const isAuthenticated = user ? true : false;
    if (isAuthenticated) {
        dispatch(login(JSON.parse(user)));
    }
    return isAuthenticated ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;

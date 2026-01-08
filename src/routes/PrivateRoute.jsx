import React from 'react';
import { Navigate, useLocation } from 'react-router';
import Loading from '../pages/shared/Loading';
import useAuth from '@/hooks/useAuth';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <Loading></Loading>
    }

    if (!user) {
        return <Navigate to='/signIn' state={location.pathname}></Navigate>
        // return <Navigate to='/signIn' state={{ from: location }} replace></Navigate>

    }

    return children;
};

export default PrivateRoute;
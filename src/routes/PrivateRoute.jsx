import React from 'react';
import { Navigate, useLocation } from 'react-router';
import Loading from '../pages/shared/Loading';
import useAuth from '@/hooks/useAuth';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth()
    const location = useLocation()

    console.log("🔐 PrivateRoute check:", {
        path: location.pathname,
        user,
        loading
    });

    if (loading) {
        return <Loading></Loading>
    }

    if (!user) {
        console.log("⛔ Redirecting to login");
        return <Navigate to='/signIn' state={{ from: location.pathname }} replace></Navigate>
        // return <Navigate to='/signIn' state={{ from: location }} replace></Navigate>

    }

    return children;
};

export default PrivateRoute;
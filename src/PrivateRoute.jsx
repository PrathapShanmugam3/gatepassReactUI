import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = () => {
    const { isAuthenticated, storePath } = useAuth();
    const location = useLocation();

    // Store the current path before rendering the route
    useEffect(() => {
        if (isAuthenticated) {
            storePath(location.pathname);
        }
    }, [isAuthenticated, location.pathname, storePath]);

    // If authenticated, render the child routes (Outlet)
    // If not authenticated, redirect to the login page
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
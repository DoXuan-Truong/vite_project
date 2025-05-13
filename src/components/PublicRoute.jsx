import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        return <Navigate to="/users" replace />;
    }

    return children;
};

export default PublicRoute;

// src/ProtectedRoute.js
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './store/auth';

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if the authentication state is already determined
        if (isAuthenticated !== undefined) {
            setIsLoading(false);
        }
    }, [isAuthenticated]);

    // Show a loading indicator while checking authentication status
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // If authenticated, render the element; otherwise, navigate to login
    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;


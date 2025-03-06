import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {alertService} from './AlertService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        localStorage.removeItem("phone");
        localStorage.removeItem("email");
        localStorage.removeItem("userName");
        setIsAuthenticated(false);
        alertService.showCustomPopup('success', 'Logout Successful');
        
        navigate('/'); // Redirect to login page after logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
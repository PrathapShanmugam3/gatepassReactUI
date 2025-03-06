import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { alertService } from './AlertService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (accessToken, refreshToken, role, phone, email, userName) => {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("role", role);
        localStorage.setItem("phone", phone);
        localStorage.setItem("email", email);
        localStorage.setItem("userName", userName);
        setIsAuthenticated(true);
        navigate('/dashboard'); // Redirect to dashboard after login
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        localStorage.removeItem("phone");
        localStorage.removeItem("email");
        localStorage.removeItem("userName");
        setIsAuthenticated(false);
        alertService.showCustomPopup('success', 'Logout Successful');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
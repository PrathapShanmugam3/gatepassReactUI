import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setIsAuthenticated(true);
            const storedPath = localStorage.getItem('redirectPath') || '/dashboard';
            navigate(storedPath);
        } else {
            setIsAuthenticated(false);
            navigate('/');
        }
    }, [navigate]);

    const login = (accessToken) => {
        localStorage.setItem('accessToken', accessToken);
        setIsAuthenticated(true);
        const storedPath = localStorage.getItem('redirectPath') || '/dashboard';
        navigate(storedPath);
    };

    const logout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('redirectPath');
            setIsAuthenticated(false);
            navigate('/');
        }
    };
    const storePath = (path) => {
        localStorage.setItem('redirectPath', path);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, storePath }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
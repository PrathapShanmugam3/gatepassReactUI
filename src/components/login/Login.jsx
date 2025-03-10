import React, { useState,useEffect } from 'react';
import Api from '../../Api';
import { useNavigate } from 'react-router-dom';
import { alertService } from '../../AlertService';
import { useAuth } from '../../AuthContext';

function Login() {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    const [usernameOrEmailOrPhone, setUsernameOrEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');


    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!usernameOrEmailOrPhone) {
            setUsernameErrorMessage('Username, email, or phone is required.');
            return;
        }

        if (!password) {
            setPasswordErrorMessage('Password is required.');
            return;
        }

        if (password.length < 6) {
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            return;
        }

        console.log('Form submitted:', { usernameOrEmailOrPhone, password });

        const reqData = { usernameOrEmailOrPhone, password };

        Api.post('/auth/login', reqData)
            .then((res) => {
                console.log(res.data);
                if (res.data.statusCode === 0 && res.data.responseContent.role === "GATEPASS_ADMIN") {
                    const { accessToken, refreshToken, role, phone, email, userName } = res.data.responseContent;

                    // Call the login function from AuthContext
                    login(accessToken, refreshToken, role, phone, email, userName);

                    alertService.showCustomPopup('success', 'Login Successful');
                    navigate('/dashboard');
                } else {
                    alertService.showCustomPopup('error', 'Access Denied');
                    console.log("Access Denied");
                }
            })
            .catch((err) => {
                console.log(err);
                alertService.showCustomPopup('error', 'Login Failed. Please try again.');
            });

        setUsernameErrorMessage('');
        setPasswordErrorMessage('');
    };

    const handleUsernameChange = (e) => {
        setUsernameOrEmailOrPhone(e.target.value);
        setUsernameErrorMessage('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordErrorMessage('');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    {/* Username/Email/Phone Field */}
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username / Email / Phone
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="usernameOrEmailOrPhone"
                            value={usernameOrEmailOrPhone}
                            onChange={handleUsernameChange}
                            placeholder="Enter username, email, or phone"
                        />
                        {usernameErrorMessage && (
                            <div className="text-danger">
                                <small>{usernameErrorMessage}</small>
                            </div>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter password"
                        />
                        {passwordErrorMessage && (
                            <div className="text-danger">
                                <small>{passwordErrorMessage}</small>
                            </div>
                        )}
                    </div>

                    {/* Login Button */}
                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!usernameOrEmailOrPhone || !password || password.length < 6}
                            onClick={handleSubmit}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
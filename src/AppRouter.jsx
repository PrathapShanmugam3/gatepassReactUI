import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import NextPage from './components/nextpage/NextPage';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import Recyclebin from './components/recyclebin/Recyclebin';

const AppRouter = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/nextpage" element={<NextPage />} />
                        <Route path="/recyclebin" element={<Recyclebin />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRouter;
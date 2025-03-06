import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import NextPage from "./components/nextpage/NextPage";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from './PrivateRoute';

const AppRouter = () => {
    return (
        <BrowserRouter basename="/gatepassReactUI">
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/nextpage" element={<NextPage />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default AppRouter;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/login/Login'
import NextPage from "./components/nextpage/NextPage";
import Authcontext from "./AuthContext";

function App() {


  return (
    <>
      <BrowserRouter basename="/gatepassReactUI">
        <Authcontext>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/nextpage" element={<NextPage />} />
          </Routes>
        </Authcontext>
      </BrowserRouter>

    </>
  )
}

export default App

import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Order from './pages/Order/Order';
import AdminLoginPopup from './components/LoginPopup/AdminLoginPopup';
import { AdminAuthProvider, useAdminAuth } from './context/AdminContext';

function App() {
    const { token, setToken } = useAdminAuth();
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true); // State to track initial load

 useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        setToken(storedToken);
        setShowLogin(false);
        if (initialLoad) {
            navigate('/add');
        }
    } else {
        setShowLogin(true);
        navigate('/login');
    }
    // Ensure that initialLoad is set to false after the first load
    if (initialLoad) {
        setInitialLoad(false);
    }
}, [setToken, navigate, initialLoad]); // Ensure dependencies are correctly managed


    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
        setShowLogin(true);
        navigate('/login');
    };

    return (
        <div>
            <div className="app-content">
                <Sidebar token={token} handleLogout={handleLogout} />
                <Routes>
                    <Route path="/add" element={<Add />} />
                    <Route path="/list" element={<List />} />
                    <Route path="/orders" element={<Order />} />
                    <Route path="/login" element={<AdminLoginPopup setShowLogin={setShowLogin} />} />
                </Routes>
            </div>
        </div>
    );
}

const WrappedApp = () => (
    <AdminAuthProvider>
        <App />
    </AdminAuthProvider>
);

export default WrappedApp;

import React, { useState } from 'react';
import './Sidebar.css'; // Import the CSS file
import { NavLink } from 'react-router-dom';
import AdminLoginPopup from '../LoginPopup/AdminLoginPopup';

const Sidebar = ({ token, handleLogout }) => {
    const [showAdminLogin, setShowAdminLogin] = useState(false);

    return (
        <div className="sidebar">
            {!token && <h1 className="logo">MEal EXPrees</h1>}
            {token && (
                
                <div className="sidebar-options">
                    <h1 className="logo">MEal EXPrees</h1>
                    <NavLink to="/add" className="sidebar-option" activeClassName="active">
                        <i className="ri-home-7-fill"></i>
                        <p>Management</p>
                    </NavLink>
                    <NavLink to="/list" className="sidebar-option" activeClassName="active">
                        <i className="ri-restaurant-fill"></i>
                        <p>Restaurant Menu</p>
                    </NavLink>
                    <NavLink to="/orders" className="sidebar-option" activeClassName="active">
                        <i className="ri-order-play-fill"></i>
                        <p>Orders & Reservation</p>
                    </NavLink>
                    <div className="sidebar-bottom" onClick={handleLogout}>
                        <i className="ri-logout-circle-r-line"></i>
                        <p>LOGOUT</p>
                    </div>
                </div>
            )}
            {!token && (
                <div className="sidebar-options">
                    <div className="sidebar-option" onClick={() => setShowAdminLogin(true)}>
                        <i className="ri-admin-line"></i>
                        <p>Login</p>
                    </div>
                </div>
            )}
            {showAdminLogin && !token && <AdminLoginPopup setShowLogin={setShowAdminLogin} />}
        </div>
    );
};

export default Sidebar;

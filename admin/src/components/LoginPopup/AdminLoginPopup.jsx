import React, { useState, useEffect, useRef, useContext } from 'react';
import './AdminLoginPopup.css';
import axios from 'axios';
import { AdminAuthContext } from '../../context/AdminContext';

const AdminLoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState('Sign Up');
    const popupRef = useRef(null);
    const { url, setToken } = useContext(AdminAuthContext);
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        adminkey: ''
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const onAdminAction = async (event) => {
        event.preventDefault();
        let newUrl = url;

        if (currState === 'Login') {
            newUrl += '/api/admin/login';
        } else {
            newUrl += '/api/admin/register';
        }

        try {
            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                setShowLogin(false);
                window.location.reload(); // Reload the page after successful login
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error');
        }
    };

    // Function to handle click outside the popup
    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowLogin(false); // Close the popup if clicked outside
        }
    };

    useEffect(() => {
        // Add event listener when component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="admin-login-popup">
            <form onSubmit={onAdminAction} ref={popupRef} className="admin-popup-container">
                <div className="admin-popup-title">
                    <h2>{currState}</h2>
                    <div className="admin-close-icon" onClick={() => setShowLogin(false)}>
                        <i className="ri-folder-close-fill"></i>
                    </div>
                </div>
                <div className="admin-popup-inputs">
                    {currState === 'Login' ? null : (
                        <>
                            <input
                                name="username"
                                onChange={onChangeHandler}
                                value={data.username}
                                type="text"
                                placeholder="Your username"
                                required
                            />
                            <input
                                name="adminkey"
                                onChange={onChangeHandler}
                                value={data.adminkey}
                                type="text"
                                placeholder="Enter Admin key"
                                required
                            />
                        </>
                    )}
                    <input
                        name="email"
                        onChange={onChangeHandler}
                        type="email"
                        placeholder="Your email"
                        value={data.email}
                        required
                    />
                    <input
                        name="password"
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit" className="admin-login-btn">
                    {currState === 'Sign Up' ? 'Create account' : 'Login'}
                </button>
                <div className="admin-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing I agree to the terms of use & privacy policy</p>
                </div>
                {currState === 'Login' ? (
                    <p>
                        Create a new admin account?{' '}
                        <span onClick={() => setCurrState('Sign Up')}>Click here</span>
                    </p>
                ) : (
                    <p>
                        Already have an admin account?{' '}
                        <span onClick={() => setCurrState('Login')}>Login here</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default AdminLoginPopup;

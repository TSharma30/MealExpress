import React, { useState, useEffect, useRef } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Sign Up");
    const popupRef = useRef(null);

    // Function to handle click outside the popup
    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowLogin(false); // Close the popup if clicked outside
        }
    };

    useEffect(() => {
        // Add event listener when component mounts
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener when component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="login-popup">
            <div ref={popupRef} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <div className="close-icon" onClick={() => setShowLogin(false)}>
                        <img src={assets.cross_icon} alt="Close" />
                    </div>
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? null : <input type="text" placeholder="Your name" required />}
                    <input type="email" placeholder="Your email" required />
                    <input type="password" placeholder="Password" required />
                </div>
                <button className="login-btn">{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing I agree to the terms of use & privacy policy</p>
                </div>
                {currState === "Login" ? (
                    <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                )}
            </div>
        </div>
    );
};

export default LoginPopup;

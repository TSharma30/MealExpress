import React, { useState, useEffect, useRef, useContext } from 'react';
import './LoginPopup.css';
import axios from "axios" 
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Sign Up");
    const popupRef = useRef(null);

    const {url,setToken}=useContext(StoreContext)
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler=(event)=>
        {
            const name=event.target.name 
            const value=event.target.value 
            setData(data=>({...data,[name]:value}))

        }
        
        const onLogin=async(event)=>
            {
                event.preventDefault()
                let newUrl=url;
                if(currState==="Login")
                    {
                        newUrl+="/api/user/login"
                    }
                else
                {
                    newUrl+="/api/user/register"
                }
                const response=await axios.post(newUrl,data)
                if(response.data.success)
                    {
                        setToken(response.data.success)
                        localStorage.setItem("token",response.data.token)
                        setShowLogin(false)
                    }
                    else
                    {
                        alert(response.data.message)
                    }


            }

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
            <form onSubmit={onLogin}ref={popupRef} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <div className="close-icon" onClick={() => setShowLogin(false)}>
                        <img src={assets.cross_icon} alt="Close" />
                    </div>
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? null : <input  name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />}
                    <input name="email"  onChange={onChangeHandler}type="email" placeholder="Your email" value={data.email} required />
                    <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
                </div>
                <button type="submit" className="login-btn">{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing I agree to the terms of use & privacy policy</p>
                </div>
                {currState === "Login" ? (
                    <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;

import React from 'react';
import { assets } from '../../assets/assets';
import "./Navbar.css"
const Navbar = () => {
  return (
    <div className="navbar">
      <img src={assets.logo} alt="Logo" className="navbar-logo" />
      <img src={assets.profile_image} alt="Profile" className="navbar-profile" />
    </div>
  );
}

export default Navbar;

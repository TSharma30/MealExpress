import React, { useState } from 'react';
import "../../assets/assets";
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar = () => {
  const [active, setActive] = useState('home');

  return (
    <div className="navbar">
      <img src={assets.logo} alt="image not found" />
      <ul className="navbar-menu">
        <li className={active === 'home' ? 'active' : ''} onClick={() => setActive('home')}>home</li>
        <li className={active === 'menu' ? 'active' : ''} onClick={() => setActive('menu')}>menu</li>
        <li className={active === 'mobile-app' ? 'active' : ''} onClick={() => setActive('mobile-app')}>mobile-app</li>
        <li className={active === 'contact' ? 'active' : ''} onClick={() => setActive('contact')}>contact us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button className='navbutton'><span>Sign in</span></button>
      </div>
    </div>
  );
}

export default Navbar;

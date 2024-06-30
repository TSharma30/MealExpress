import React, { useContext, useState } from 'react';
import "../../assets/assets";
import { assets } from '../../assets/assets';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [active, setActive] = useState('home');
  const {getTotalCartAmount}=useContext(StoreContext)

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="image not found" />
      </Link>
      <ul className="navbar-menu">
        <li className={active === 'home' ? 'active' : ''} onClick={() => setActive('home')}>home</li>
        <li className={active === 'menu' ? 'active' : ''} onClick={() => setActive('menu')}>menu</li>
        <li className={active === 'mobile-app' ? 'active' : ''} onClick={() => setActive('mobile-app')}>mobile-app</li>
        <li className={active === 'contact' ? 'active' : ''} onClick={() => setActive('contact')}>contact us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        <button onClick={() => setShowLogin(true)} className='navbutton'><span>Sign in</span></button>
      </div>
    </div>
  );
}

export default Navbar;

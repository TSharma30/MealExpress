import React, { Profiler, useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './Navbar.css';

const Navbar = ({ setShowLogin }) => {
  const [active, setActive] = useState('home');
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    return <Navigate to="/" />;
  };

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
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)} className='navbutton'><span>Sign in</span></button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

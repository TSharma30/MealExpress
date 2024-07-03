import React from 'react';
import { assets } from '../../assets/assets';
import './Sidebar.css'; // Import the CSS file
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className="sidebar-option" activeClassName="active">
          <img src={assets.add_icon} alt="Add Items" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option" activeClassName="active">
          <img src={assets.order_icon} alt="List Items" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option" activeClassName="active">
          <img src={assets.order_icon} alt="Orders" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from  '../../assets/craftiquelogo.png';
import defaultDP from '../../assets/male_dp.jpeg';

const Navbar = ({ user }) => {
  const profileSrc = user?.profile_photo || defaultDP;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Craftique Logo" className="logo" />
        <h1 className="brand">Craftique</h1>
        
      </div>

      <div className="navbar-right">
        <input type="text" placeholder="Search for handicrafts..." className="search-bar" />
        <img src={profileSrc} alt="Profile" className="profile-photo" />
      </div>
    </nav>
  );
};

export default Navbar;

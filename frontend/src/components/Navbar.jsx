import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Heart, User, ShieldAlert } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="bottom-navbar glass">
      <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <Home size={24} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/search" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <Search size={24} />
        <span>Search</span>
      </NavLink>
      <NavLink to="/emergency" className={({ isActive }) => isActive ? 'nav-item emergency active' : 'nav-item emergency'}>
        <div className="emergency-icon-wrapper">
          <ShieldAlert size={28} />
        </div>
        <span>Help</span>
      </NavLink>
      <NavLink to="/favorites" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <Heart size={24} />
        <span>Saved</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <User size={24} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;

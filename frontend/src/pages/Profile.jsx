import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, CreditCard, Bell, Shield, ChevronRight, LogOut, HeartPulse, ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const settingsOptions = [
    { icon: <ClipboardList size={20} />, label: 'Health Records', sub: 'Blood type, Allergies' },
    { icon: <CreditCard size={20} />, label: 'Payments', sub: 'Managed linked cards' },
    { icon: <Bell size={20} />, label: 'Notifications', sub: 'Appointments, Reminders' },
    { icon: <Shield size={20} />, label: 'Security', sub: 'Password, Biometrics' },
    { icon: <Settings size={20} />, label: 'Account Settings', sub: 'Privacy, Theme, and more', path: '/settings' },
  ];


  return (
    <div className="profile-page-container page-wrapper">
      <SEO
        title="My Profile"
        description="Manage your MediTravel profile, health records, payment methods, and account settings."
        keywords="profile, account settings, health records, meditravel account"
        path="/profile"
      />
      <header className="profile-header">
        <h1>My Profile</h1>
        <button className="icon-btn glass" onClick={() => navigate('/profile')}>
          <Bell size={20} />
          <span className="dot"></span>
        </button>
      </header>



      <section className="profile-user-card card">
        <div className="user-avatar-wrapper">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200" alt="User" />
        </div>
        <div className="user-info">
          <h2>Ankit Sharma</h2>
          <p>India (Traveling to Thailand)</p>
          <div className="user-badges">
            <span className="badge">Premium User</span>
            <span className="badge-blue">O+ Positive</span>
          </div>
        </div>
      </section>

      <div className="profile-quick-stats">
        <div className="stat-card glass">
          <HeartPulse color="var(--urgent)" />
          <div className="stat-text">
            <strong>72 bpm</strong>
            <span>Heart Rate</span>
          </div>
        </div>
        <div className="stat-card glass">
          <ClipboardList color="var(--primary)" />
          <div className="stat-text">
            <strong>3 active</strong>
            <span>Consults</span>
          </div>
        </div>
      </div>

      <section className="settings-list">
        <h3>Account Settings</h3>
        {settingsOptions.map((opt, i) => (
          <motion.div 
            key={i} 
            className="setting-item"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => opt.path && navigate(opt.path)}
          >
            <div className="setting-icon-wrapper">{opt.icon}</div>
            <div className="setting-info">
              <strong>{opt.label}</strong>
              <span>{opt.sub}</span>
            </div>
            <ChevronRight size={18} color="var(--text-muted)" />
          </motion.div>

        ))}
      </section>

      <motion.button
        className="logout-btn"
        onClick={handleLogout}
        whileTap={{ scale: 0.97 }}
      >
        <LogOut size={20} />
        <span>Log Out</span>
      </motion.button>
    </div>
  );
};

export default Profile;

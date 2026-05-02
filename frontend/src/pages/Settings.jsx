import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Save, User, Mail, Lock, ShieldAlert } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import './Settings.css';

const SettingsSchema = Yup.object().shape({
  fullName: Yup.string().min(2, 'Too Short!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Must be at least 6 characters'),
});

const Settings = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth(); // We can use login to refresh the user state/token
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      password: '',
    },
    validationSchema: SettingsSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/auth/profile`, values);
        
        // Update local state by re-storing the new token and user data
        localStorage.setItem('meditravel_token', data.token);
        window.location.reload(); // Refresh to update all context data
        
        toast.success('Profile updated successfully!');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Update failed');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="settings-page-container page-wrapper">
      <header className="settings-header">
        <button className="back-btn" onClick={() => navigate('/profile')}>
          <ChevronLeft size={24} />
        </button>
        <h1>Settings</h1>
      </header>

      <div className="settings-section">
        <h3>Personal Information</h3>
        <div className="settings-form-card">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label><User size={16} /> Full Name</label>
              <input
                name="fullName"
                type="text"
                className="settings-input"
                {...formik.getFieldProps('fullName')}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <div className="error-text">{formik.errors.fullName}</div>
              )}
            </div>

            <div className="form-group">
              <label><Mail size={16} /> Email Address</label>
              <input
                name="email"
                type="email"
                className="settings-input"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-text">{formik.errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label><Lock size={16} /> New Password (Optional)</label>
              <input
                name="password"
                type="password"
                placeholder="Leave blank to keep current"
                className="settings-input"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error-text">{formik.errors.password}</div>
              )}
            </div>

            <motion.button
              type="submit"
              className="save-settings-btn"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </motion.button>
          </form>
        </div>
      </div>

      <div className="settings-section danger-zone">
        <h3><ShieldAlert size={18} /> Danger Zone</h3>
        <button className="delete-account-btn" onClick={() => toast.error('Feature coming soon!')}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;

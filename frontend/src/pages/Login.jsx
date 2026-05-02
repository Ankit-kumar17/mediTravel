import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GoogleLogin } from '@react-oauth/google';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import './Login.css';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const { login, googleAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setServerError('');
      try {
        await login(values.email, values.password);
        toast.success('Welcome back!');
        navigate('/home');
      } catch (err) {
        const msg = err.response?.data?.message || 'Login failed. Please try again.';
        setServerError(msg);
        toast.error(msg);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleGoogleSuccess = async (credentialResponse) => {
    setServerError('');
    try {
      await googleAuth(credentialResponse.credential);
      toast.success('Welcome!');
      navigate('/home');
    } catch (err) {
      const msg = err.response?.data?.message || 'Google sign-in failed';
      setServerError(msg);
      toast.error(msg);
    }
  };

  const handleGoogleError = () => {
    toast.error('Google sign-in was cancelled');
  };

  return (
    <div className="auth-page">
      <SEO
        title="Login"
        description="Sign in to MediTravel Assist to access your medical travel dashboard, book appointments, and find doctors."
        keywords="login, sign in, meditravel account, medical travel login"
        path="/login"
      />
      {/* Animated background */}
      <div className="auth-bg-gradient" />
      <div className="auth-orb auth-orb-1" />
      <div className="auth-orb auth-orb-2" />

      <div className="auth-content">
        {/* Brand */}
        <motion.div
          className="auth-brand"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-brand-badge">
            <Heart fill="white" />
            MediTravel Assist
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="auth-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          Welcome Back
        </motion.h1>
        <motion.p
          className="auth-subtitle"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          Sign in to access your medical travel dashboard
        </motion.p>

        {/* Form Card */}
        <motion.div
          className="auth-card"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Server Error */}
          {serverError && (
            <motion.div
              className="auth-server-error shake"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <AlertCircle size={16} />
              {serverError}
            </motion.div>
          )}

          <form onSubmit={formik.handleSubmit} noValidate id="login-form">
            {/* Email */}
            <div className="auth-input-group">
              <label className="auth-input-label" htmlFor="login-email">Email Address</label>
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`auth-input ${formik.touched.email && formik.errors.email ? 'input-error' : ''}`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="email"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <motion.div
                  className="auth-field-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={12} />
                  {formik.errors.email}
                </motion.div>
              )}
            </div>

            {/* Password */}
            <div className="auth-input-group">
              <label className="auth-input-label" htmlFor="login-password">Password</label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={`auth-input ${formik.touched.password && formik.errors.password ? 'input-error' : ''}`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="current-password"
                  style={{ paddingRight: '48px' }}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <motion.div
                  className="auth-field-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={12} />
                  {formik.errors.password}
                </motion.div>
              )}
            </div>

            {/* Forgot password */}
            <div className="auth-options-row">
              <span className="auth-forgot-link">Forgot password?</span>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              className="auth-submit-btn"
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <div className="auth-spinner" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <div className="auth-divider-line" />
            <span className="auth-divider-text">or continue with</span>
            <div className="auth-divider-line" />
          </div>

          {/* Google Sign In */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            text="signin_with"
            shape="rectangular"
            theme="outline"
            size="large"
            width="100%"
            logo_alignment="center"
          />
        </motion.div>

        {/* Footer */}
        <motion.div
          className="auth-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="auth-footer-text">
            Don't have an account?
            <Link to="/signup" className="auth-footer-link">Sign Up</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

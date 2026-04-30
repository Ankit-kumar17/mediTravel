import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GoogleLogin } from '@react-oauth/google';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, AlertCircle, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import './Login.css';
import './Signup.css';

const signupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[a-zA-Z]/, 'Must contain at least one letter')
    .matches(/\d/, 'Must contain at least one number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
});

const getPasswordStrength = (password) => {
  if (!password) return { level: 0, label: '' };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { level: 1, label: 'Weak' };
  if (score <= 3) return { level: 2, label: 'Medium' };
  return { level: 3, label: 'Strong' };
};

const Signup = () => {
  const navigate = useNavigate();
  const { signup, googleAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setServerError('');
      try {
        await signup(values.fullName, values.email, values.password);
        toast.success('Account created successfully!');
        navigate('/home');
      } catch (err) {
        const msg = err.response?.data?.message || 'Signup failed. Please try again.';
        setServerError(msg);
        toast.error(msg);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const passwordStrength = useMemo(
    () => getPasswordStrength(formik.values.password),
    [formik.values.password]
  );

  const handleGoogleSuccess = async (credentialResponse) => {
    setServerError('');
    try {
      await googleAuth(credentialResponse.credential);
      toast.success('Welcome to MediTravel!');
      navigate('/home');
    } catch (err) {
      const msg = err.response?.data?.message || 'Google sign-up failed';
      setServerError(msg);
      toast.error(msg);
    }
  };

  const handleGoogleError = () => {
    toast.error('Google sign-in was cancelled');
  };

  return (
    <div className="auth-page">
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
          Create Account
        </motion.h1>
        <motion.p
          className="auth-subtitle"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          Join thousands finding world-class medical care abroad
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

          <form onSubmit={formik.handleSubmit} noValidate id="signup-form">
            {/* Full Name */}
            <div className="auth-input-group">
              <label className="auth-input-label" htmlFor="signup-fullname">Full Name</label>
              <div className="auth-input-wrapper">
                <User className="auth-input-icon" />
                <input
                  id="signup-fullname"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  className={`auth-input ${formik.touched.fullName && formik.errors.fullName ? 'input-error' : ''}`}
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="name"
                />
              </div>
              {formik.touched.fullName && formik.errors.fullName && (
                <motion.div
                  className="auth-field-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={12} />
                  {formik.errors.fullName}
                </motion.div>
              )}
            </div>

            {/* Email */}
            <div className="auth-input-group">
              <label className="auth-input-label" htmlFor="signup-email">Email Address</label>
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" />
                <input
                  id="signup-email"
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
              <label className="auth-input-label" htmlFor="signup-password">Password</label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  className={`auth-input ${formik.touched.password && formik.errors.password ? 'input-error' : ''}`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="new-password"
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
              {/* Password Strength */}
              {formik.values.password && (
                <>
                  <div className="password-strength">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`password-strength-bar ${
                          passwordStrength.level >= i
                            ? passwordStrength.level === 1
                              ? 'weak'
                              : passwordStrength.level === 2
                              ? 'medium'
                              : 'strong'
                            : ''
                        }`}
                      />
                    ))}
                  </div>
                  <div
                    className={`password-strength-text ${
                      passwordStrength.level === 1
                        ? 'weak'
                        : passwordStrength.level === 2
                        ? 'medium'
                        : 'strong'
                    }`}
                  >
                    {passwordStrength.label}
                  </div>
                </>
              )}
            </div>

            {/* Confirm Password */}
            <div className="auth-input-group">
              <label className="auth-input-label" htmlFor="signup-confirm-password">Confirm Password</label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />
                <input
                  id="signup-confirm-password"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className={`auth-input ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'input-error' : ''}`}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  autoComplete="new-password"
                  style={{ paddingRight: '48px' }}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <motion.div
                  className="auth-field-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={12} />
                  {formik.errors.confirmPassword}
                </motion.div>
              )}
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              className="auth-submit-btn"
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
              style={{ marginTop: '8px' }}
            >
              {isSubmitting ? (
                <div className="auth-spinner" />
              ) : (
                <>
                  Create Account
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

          {/* Google Sign Up */}
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            text="signup_with"
            shape="rectangular"
            theme="outline"
            size="large"
            width="100%"
            logo_alignment="center"
          />

          {/* Terms */}
          <p className="signup-terms">
            By creating an account, you agree to our{' '}
            <a href="#">Terms of Service</a> and{' '}
            <a href="#">Privacy Policy</a>
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="auth-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="auth-footer-text">
            Already have an account?
            <Link to="/login" className="auth-footer-link">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;

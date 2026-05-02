import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';

// Page Imports
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import DoctorProfile from './pages/DoctorProfile';
import Emergency from './pages/Emergency';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Booking from './pages/Booking';
import Messages from './pages/Messages';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';

// Component Imports
import Navbar from './components/Navbar';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -10 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

// Routes where navbar should be hidden
const HIDE_NAVBAR_ROUTES = ['/', '/login', '/signup', '/settings'];

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Onboarding /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
        <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
        <Route path="/home" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/search" element={<PageTransition><SearchResults /></PageTransition>} />
        <Route path="/doctor/:id" element={<PageTransition><DoctorProfile /></PageTransition>} />
        <Route path="/booking/:doctorId" element={<PageTransition><Booking /></PageTransition>} />
        <Route path="/messages" element={<PageTransition><Messages /></PageTransition>} />
        <Route path="/emergency" element={<PageTransition><Emergency /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
        <Route path="/favorites" element={<PageTransition><Favorites /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const AppLayout = () => {
  const location = useLocation();
  const hideNavbar = HIDE_NAVBAR_ROUTES.includes(location.pathname);

  return (
    <div className="app-container">
      <main>
        <AnimatedRoutes />
      </main>
      {!hideNavbar && <Navbar />}
    </div>
  );
};

const App = () => {
  // Replace with your actual Google Client ID from Google Cloud Console
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your_google_client_id_here';

  return (
    <HelmetProvider>
      <GoogleOAuthProvider clientId={googleClientId}>
        <AuthProvider>
          <Router>
            <AppLayout />
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#1F2937',
                  color: '#F9FAFB',
                  borderRadius: '12px',
                  padding: '14px 20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                },
                success: {
                  iconTheme: { primary: '#10B981', secondary: '#F9FAFB' },
                },
                error: {
                  iconTheme: { primary: '#EF4444', secondary: '#F9FAFB' },
                },
              }}
            />
          </Router>
        </AuthProvider>
      </GoogleOAuthProvider>
    </HelmetProvider>
  );
};

export default App;

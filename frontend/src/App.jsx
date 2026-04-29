import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

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

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Onboarding /></PageTransition>} />
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

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <main>
          <AnimatedRoutes />
        </main>
        <Navbar />
      </div>
    </Router>
  );
};

export default App;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Globe, ShieldCheck, ArrowRight } from 'lucide-react';
import './Onboarding.css';

const Onboarding = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <ShieldCheck className="icon-blue" />, text: "Find Verified Doctors" },
    { icon: <Globe className="icon-green" />, text: "Know the Cost Upfront" },
    { icon: <CheckCircle className="icon-orange" />, text: "Speak Your Language" }
  ];

  return (
    <div className="onboarding-container">
      <div className="hero-section">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="brand-badge"
        >
          MediTravel Assist
        </motion.div>
        
        <div className="illustration-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" 
            alt="Medical Professional" 
            className="hero-image"
          />
        </div>
      </div>

      <div className="content-section">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Medical Care <br /><span>Without Borders</span>
        </motion.h1>

        <ul className="feature-list">
          {features.map((f, i) => (
            <motion.li 
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
            >
              {f.icon}
              <span>{f.text}</span>
            </motion.li>
          ))}
        </ul>

        <motion.button 
          className="get-started-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/home')}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Get Started
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default Onboarding;

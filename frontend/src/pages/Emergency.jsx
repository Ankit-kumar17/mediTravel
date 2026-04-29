import React from 'react';
import { Phone, MapPin, Navigation, ShieldAlert, Heart, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import './Emergency.css';

const Emergency = () => {
  const contacts = [
    { name: 'Local Ambulance', phone: '911', icon: <Truck />, color: '#EF4444' },
    { name: 'Nearest Hospital', phone: '+1 234 567 890', icon: <Heart />, color: '#0076CE' },
    { name: 'Police Station', phone: '112', icon: <ShieldAlert />, color: '#1F2937' },
  ];

  return (
    <div className="emergency-container page-wrapper">
      <header className="emergency-header">
        <h1>Emergency Help</h1>
        <p>Immediate medical assistance is just a tap away.</p>
      </header>

      <section className="map-preview card">
        <div className="map-placeholder">
          <MapPin size={40} color="var(--urgent)" />
          <span>Your current location is being tracked...</span>
        </div>
        <div className="location-details">
          <div className="address">
            <strong>St. Mary's Medical Center</strong>
            <p>2.4 km away • 8 mins travel</p>
          </div>
          <button className="nav-btn">
            <Navigation size={20} />
          </button>
        </div>
      </section>

      <section className="contact-list">
        {contacts.map((contact, i) => (
          <motion.div 
            key={i}
            className="contact-card"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ borderLeft: `6px solid ${contact.color}` }}
          >
            <div className="contact-icon" style={{ backgroundColor: `${contact.color}20`, color: contact.color }}>
              {contact.icon}
            </div>
            <div className="contact-info">
              <h3>{contact.name}</h3>
              <p>{contact.phone}</p>
            </div>
            <a href={`tel:${contact.phone}`} className="call-btn" style={{ backgroundColor: contact.color }}>
              <Phone size={20} />
            </a>
          </motion.div>
        ))}
      </section>

      <div className="emergency-footer">
        <button className="sos-large-btn">
          <span>S O S</span>
          <small>Hold to notify family & clinic</small>
        </button>
      </div>
    </div>
  );
};

export default Emergency;

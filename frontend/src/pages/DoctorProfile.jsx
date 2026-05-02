import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, Heart, Star, MapPin, Clock, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { doctors } from '../data/mockData';
import SEO from '../components/SEO';
import './DoctorProfile.css';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find(d => d.id === parseInt(id)) || doctors[0];

  return (
    <div className="doctor-profile-container">
      <SEO
        title={`Dr. ${doctor.name} — ${doctor.specialty}`}
        description={`Book an appointment with ${doctor.name}, ${doctor.specialty}. Located at ${doctor.location}. Rating: ${doctor.rating}/5.`}
        keywords={`${doctor.name}, ${doctor.specialty}, doctor appointment, book doctor`}
        path={`/doctor/${id}`}
      />
      <header className="profile-header-overlay">
        <div className="header-actions">
          <button onClick={() => navigate(-1)} className="action-btn glass">
            <ChevronLeft size={24} />
          </button>
          <div className="right-actions">
            <button className="action-btn glass"><Share2 size={20} /></button>
            <button className="action-btn glass"><Heart size={20} /></button>
          </div>
        </div>
        <img src={doctor.image} alt={doctor.name} className="hero-img" />
      </header>

      <motion.div 
        className="profile-details-sheet"
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className="sheet-handle"></div>
        <div className="details-header">
          <div className="details-main">
            <h1>{doctor.name}</h1>
            <p className="specialty">{doctor.specialty}</p>
            <div className="location-inline">
              <MapPin size={14} />
              <span>{doctor.location}</span>
            </div>
          </div>
          <div className="rating-badge">
            <Star size={16} fill="currentColor" />
            <span>{doctor.rating}</span>
          </div>
        </div>

        <div className="quick-stats">
          <div className="stat-item card">
            <span className="stat-value">{doctor.experience}</span>
            <span className="stat-label">Experience</span>
          </div>
          <div className="stat-item card">
            <span className="stat-value">{doctor.patients}</span>
            <span className="stat-label">Patients</span>
          </div>
          <div className="stat-item card">
            <span className="stat-value">{doctor.successRate}</span>
            <span className="stat-label">Success</span>
          </div>
        </div>

        <section className="profile-section">
          <h2>About Doctor</h2>
          <p className="bio-text">{doctor.bio}</p>
        </section>

        <section className="profile-section">
          <h2>Working Time</h2>
          <div className="time-card glass">
            <Clock size={20} color="var(--primary)" />
            <div className="time-info">
              <strong>Mon - Fri</strong>
              <span>09:00 AM - 05:00 PM</span>
            </div>
          </div>
        </section>

        <div className="profile-actions-fixed glass">
          <button className="chat-btn glass" onClick={() => navigate('/messages')}>
            <MessageSquare size={24} color="var(--primary)" />
          </button>
          <button className="book-full-btn ripple" onClick={() => navigate(`/booking/${doctor.id}`)}>
            Book Appointment
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DoctorProfile;

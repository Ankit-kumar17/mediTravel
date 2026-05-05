import React, { useState, useEffect } from 'react';
import { Search, Bell, MapPin, ArrowRight, Calendar, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories, doctors as mockDoctors, mockAppointments } from '../data/mockData';
import SEO from '../components/SEO';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState(mockDoctors);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/doctors`);
        if (res.data && res.data.length > 0) {
          setDoctors(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch doctors from backend, using mock data", error);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="home-container page-wrapper">
      <SEO
        title="Home"
        description="Find trusted doctors and hospitals near you. Book appointments, view ratings, and get emergency medical help while traveling."
        keywords="find doctors, hospital search, book appointment, medical tourism, healthcare"
        path="/home"
      />
      <header className="home-header">
        <div className="user-profile" onClick={() => navigate('/profile')}>
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" alt="User" />
          <div className="welcome">
            <p>Hello, Ankit</p>
            <h3>How are you today?</h3>
          </div>
        </div>
        <div className="home-header-actions">

          <button className="icon-btn glass" onClick={() => navigate('/profile')}>
            <Bell size={20} />
            <span className="dot"></span>
          </button>
        </div>



      </header>

      <section className="search-section">
        <div className="search-bar glass" onClick={() => navigate('/search')}>
          <Search size={20} color="var(--text-muted)" />
          <input type="text" placeholder="Search for doctors, surgery..." readOnly />
        </div>
      </section>

      <section className="appointment-banner animate-float">
        <div className="banner-content">
          <span className="badge">Next Appointment</span>
          <h2>{mockAppointments[0].doctorName}</h2>
          <div className="appointment-meta">
            <div className="meta-item">
              <Calendar size={14} />
              <span>{mockAppointments[0].date}</span>
            </div>
            <div className="meta-item">
              <ArrowRight size={14} />
              <span>{mockAppointments[0].time}</span>
            </div>
          </div>
        </div>
        <img src={doctors.find(d => d.id === mockAppointments[0].doctorId)?.image} alt="Doctor" />
      </section>

      <section className="categories-section">
        <div className="section-header">
          <h2>Specialties</h2>
          <button className="see-all" onClick={() => navigate('/search')}>See All</button>
        </div>
        <div className="categories-grid">
          {categories.slice(0, 4).map((cat) => (
            <motion.div 
              key={cat.id} 
              className="category-pill"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{ background: cat.color }}
              onClick={() => navigate('/search', { state: { category: cat.name } })}
            >
              <span>{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="popular-section">
        <div className="section-header">
          <h2>Top Doctors</h2>
          <button className="see-all" onClick={() => navigate('/search')}>See All</button>
        </div>
        <div className="doctor-list">
          {doctors.slice(0, 2).map((doc) => (
            <motion.div 
              key={doc.id} 
              className="doctor-card card"
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/doctor/${doc.id}`)}
            >
              <img src={doc.image} alt={doc.name} className="doctor-thumb" />
              <div className="doctor-info">
                <h3>{doc.name}</h3>
                <p>{doc.specialty}</p>
                <div className="doctor-meta">
                  <span className="rating">⭐ {doc.rating}</span>
                  <span className="location">📍 {doc.location.split(',')[0]}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

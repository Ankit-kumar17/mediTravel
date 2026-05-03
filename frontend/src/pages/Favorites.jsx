import React from 'react';
import { Star, MapPin, ChevronRight, Heart, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Favorites.css';

const Favorites = () => {
  const navigate = useNavigate();

  const savedDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      location: 'Bangkok, Thailand',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 3,
      name: 'Dr. Elena Rossi',
      specialty: 'Surgeon',
      location: 'Rome, Italy',
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200'
    }
  ];

  return (
    <div className="favorites-page-container page-wrapper">
      <header className="favorites-header">
        <h1>Saved Doctors</h1>
        <p>Your shortlisted medical specialists</p>
      </header>

      {savedDoctors.length > 0 ? (
        <section className="favorites-list">
          {savedDoctors.map((doc) => (
            <motion.div 
              key={doc.id} 
              className="fav-card card"
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/doctor/${doc.id}`)}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <div className="fav-content">
                <img src={doc.image} alt={doc.name} className="fav-thumb" />
                <div className="fav-info">
                  <div className="fav-top">
                    <h3>{doc.name}</h3>
                    <Heart size={18} fill="var(--urgent)" color="var(--urgent)" />
                  </div>
                  <p className="specialty">{doc.specialty}</p>
                  <div className="fav-meta">
                    <span className="rating"><Star size={14} fill="currentColor" /> {doc.rating}</span>
                    <span className="location"><MapPin size={14} /> {doc.location.split(',')[0]}</span>
                  </div>
                </div>
              </div>
              <div className="fav-footer">
                <button className="view-profile-btn">View Profile <ChevronRight size={16} /></button>
              </div>
            </motion.div>
          ))}
        </section>
      ) : (
        <div className="empty-favorites">
          <div className="empty-icon glass"><Heart size={40} color="var(--text-muted)" /></div>
          <h2>No Saved Doctors</h2>
          <p>Start exploring and save your favorite medical professionals for quick access.</p>
          <button className="book-mini-btn" onClick={() => navigate('/search')}>Explore Doctors</button>
        </div>
      )}
    </div>
  );
};

export default Favorites;

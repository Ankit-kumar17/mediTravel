import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, MapPin, ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { doctors as allDoctors } from '../data/mockData';
import './SearchResults.css';

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredDoctors, setFilteredDoctors] = useState(allDoctors);

  useEffect(() => {
    if (location.state && location.state.category) {
      setActiveFilter(location.state.category);
    }
  }, [location.state]);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredDoctors(allDoctors);
    } else {
      setFilteredDoctors(allDoctors.filter(doc => doc.specialty === activeFilter));
    }
  }, [activeFilter]);

  const filters = ['All', 'Physician', 'Dentist', 'Surgery', 'Therapy'];

  return (
    <div className="search-results-container page-wrapper">
      <header className="results-header">
        <button onClick={() => navigate('/home')} className="back-btn glass">
          <ChevronLeft size={24} />
        </button>
        <div className="search-pill glass">
          <Search size={18} />
          <span>{activeFilter === 'All' ? 'Searching all doctors' : activeFilter + 's'}</span>
        </div>
        <button className="filter-btn glass">
          <Filter size={20} />
        </button>
      </header>

      <section className="filters-scroll">
        {filters.map((f) => (
          <button 
            key={f}
            className={`filter-chip ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </section>

      <section className="results-info">
        <h3>{filteredDoctors.length} Doctors Available</h3>
      </section>

      <section className="doctor-results">
        <AnimatePresence mode="popLayout">
          {filteredDoctors.map((doc) => (
            <motion.div 
              key={doc.id} 
              layout
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="doctor-result-card card"
              onClick={() => navigate(`/doctor/${doc.id}`)}
            >
              <div className="doc-main">
                <img src={doc.image} alt={doc.name} className="doc-image" />
                <div className="doc-details">
                  <div className="rating-tag">
                    <Star size={12} fill="currentColor" />
                    <span>{doc.rating} ({doc.reviews} reviews)</span>
                  </div>
                  <h3>{doc.name}</h3>
                  <p className="specialty">{doc.specialty}</p>
                  <div className="location-tag">
                    <MapPin size={14} />
                    <span>{doc.location}</span>
                  </div>
                </div>
              </div>
              <div className="doc-footer">
                <span className="price-tag">{doc.price}</span>
                <button className="book-mini-btn">Book Now</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredDoctors.length === 0 && (
          <div className="no-results animate-float">
            <p>No doctors found for this category.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchResults;

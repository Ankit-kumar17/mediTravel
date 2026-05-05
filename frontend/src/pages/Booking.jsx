import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, CreditCard, ChevronRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { doctors as mockDoctors } from '../data/mockData';
import SEO from '../components/SEO';
import axios from 'axios';
import './Booking.css';

const Booking = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  
  const [doctor, setDoctor] = useState(mockDoctors.find(d => d.id === parseInt(doctorId)) || mockDoctors[0]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState(1); // 1: Date/Time, 2: Payment, 3: Success

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/doctors/${doctorId}`);
        if (res.data) {
          // ensure availability array exists as mockData has it
          const fetchedDoc = { ...res.data, availability: res.data.availability || ['10:00 AM', '1:00 PM', '4:00 PM'] };
          setDoctor(fetchedDoc);
        }
      } catch (error) {
        console.error("Failed to fetch doctor from backend", error);
      }
    };
    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

  const dates = [
    { day: 'Mon', date: 24, month: 'Oct' },
    { day: 'Tue', date: 25, month: 'Oct' },
    { day: 'Wed', date: 26, month: 'Oct' },
    { day: 'Thu', date: 27, month: 'Oct' },
    { day: 'Fri', date: 28, month: 'Oct' },
    { day: 'Sat', date: 29, month: 'Oct' },
  ];

  const handleBooking = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
  };

  return (
    <div className="booking-page page-wrapper">
      <SEO
        title={`Book ${doctor.name}`}
        description={`Book an appointment with ${doctor.name}, ${doctor.specialty}. Select date, time, and pay securely.`}
        keywords="book doctor, appointment booking, medical appointment, consultation"
        path={`/booking/${doctorId}`}
      />
      <header className="booking-header">
        <button onClick={() => step === 3 ? navigate('/home') : setStep(step - 1 || 1)} className="back-btn glass">
          <ChevronLeft size={24} />
        </button>
        <h1>{step === 3 ? 'Confirmed' : 'Book Appointment'}</h1>
      </header>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="booking-content"
          >
            <div className="doctor-mini-card glass">
              <img src={doctor.image} alt={doctor.name} />
              <div className="mini-info">
                <h3>{doctor.name}</h3>
                <p>{doctor.specialty}</p>
                <span>⭐ {doctor.rating}</span>
              </div>
            </div>

            <section className="booking-section">
              <div className="section-title">
                <Calendar size={18} />
                <h2>Select Date</h2>
              </div>
              <div className="dates-scroll">
                {dates.map((d, i) => (
                  <button 
                    key={i}
                    className={`date-chip ${selectedDate === i ? 'active' : ''}`}
                    onClick={() => setSelectedDate(i)}
                  >
                    <span className="day">{d.day}</span>
                    <span className="date">{d.date}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="booking-section">
              <div className="section-title">
                <Clock size={18} />
                <h2>Available Slots</h2>
              </div>
              <div className="times-grid">
                {doctor.availability.map((t, i) => (
                  <button 
                    key={i}
                    className={`time-chip ${selectedTime === i ? 'active' : ''}`}
                    onClick={() => setSelectedTime(i)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </section>

            <div className="booking-footer">
              <button 
                className="btn-primary full-width" 
                disabled={selectedDate === null || selectedTime === null}
                onClick={handleBooking}
              >
                Proceed to Payment
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="booking-content"
          >
            <div className="payment-summary card">
              <h3>Appointment Summary</h3>
              <div className="summary-row">
                <span>Doctor</span>
                <span>{doctor.name}</span>
              </div>
              <div className="summary-row">
                <span>Date</span>
                <span>{dates[selectedDate].day}, {dates[selectedDate].date} {dates[selectedDate].month}</span>
              </div>
              <div className="summary-row">
                <span>Time</span>
                <span>{doctor.availability[selectedTime]}</span>
              </div>
              <div className="divider"></div>
              <div className="summary-row total">
                <span>Consultation Fee</span>
                <span>{doctor.price}</span>
              </div>
            </div>

            <section className="payment-methods">
              <h2>Select Payment Method</h2>
              <div className="method-pill active glass">
                <CreditCard size={20} />
                <span>Credit / Debit Card</span>
                <CheckCircle size={18} className="check" />
              </div>
              <div className="method-pill glass">
                <div className="apple-pay-icon"></div>
                <span>Apple Pay</span>
              </div>
            </section>

            <div className="booking-footer">
              <button className="btn-primary full-width" onClick={handleBooking}>
                Pay Now
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="success-content"
          >
            <div className="success-icon-wrapper animate-float">
              <CheckCircle size={80} color="var(--success)" strokeWidth={1} />
            </div>
            <h2>Appointment Confirmed!</h2>
            <p>Your appointment with <strong>{doctor.name}</strong> has been successfully booked for {dates[selectedDate].date} {dates[selectedDate].month} at {doctor.availability[selectedTime]}.</p>
            
            <div className="ticket-card glass">
              <div className="ticket-header">
                <div>
                  <p>Patient</p>
                  <strong>Ankit Kumar</strong>
                </div>
                <div>
                  <p>ID</p>
                  <strong>#MT-8829</strong>
                </div>
              </div>
              <div className="ticket-body">
                <div className="row">
                  <p>Date</p>
                  <strong>{dates[selectedDate].day}, {dates[selectedDate].date} {dates[selectedDate].month}</strong>
                </div>
                <div className="row">
                  <p>Time</p>
                  <strong>{doctor.availability[selectedTime]}</strong>
                </div>
              </div>
            </div>

            <button className="btn-primary full-width" onClick={() => navigate('/home')}>
              Back to Dashboard
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Booking;

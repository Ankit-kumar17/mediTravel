import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockMessages } from '../data/mockData';
import './Messages.css';

const Messages = () => {
  const navigate = useNavigate();

  return (
    <div className="messages-page page-wrapper">
      <header className="messages-header">
        <button onClick={() => navigate(-1)} className="back-btn glass">
          <ChevronLeft size={24} />
        </button>
        <h1>Messages</h1>
        <button className="action-btn glass">
          <MoreVertical size={20} />
        </button>
      </header>

      <div className="search-box glass">
        <Search size={18} color="var(--text-muted)" />
        <input type="text" placeholder="Search conversations..." />
      </div>

      <div className="messages-list">
        {mockMessages.map((msg, i) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="message-item card"
            onClick={() => alert('Opening chat with ' + msg.senderName)}
          >
            <div className="avatar-wrapper">
              <img src={msg.avatar} alt={msg.senderName} />
              {msg.unread && <span className="status-dot"></span>}
            </div>
            <div className="message-info">
              <div className="info-top">
                <h3>{msg.senderName}</h3>
                <span className="time">{msg.time}</span>
              </div>
              <p className={msg.unread ? 'unread' : ''}>{msg.lastMessage}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Messages;

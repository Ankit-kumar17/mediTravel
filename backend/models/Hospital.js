const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hospital name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  specialization: [String],
  rating: {
    type: Number,
    default: 0
  },
  description: String,
  image: String,
  contact: {
    email: String,
    phone: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Hospital', hospitalSchema);

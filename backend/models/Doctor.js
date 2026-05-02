const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Doctor name is required'],
    trim: true
  },
  specialty: {
    type: String,
    required: [true, 'Specialty is required']
  },
  experience: {
    type: Number,
    required: [true, 'Experience is required']
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: [true, 'Hospital reference is required']
  },
  about: String,
  image: String,
  rating: {
    type: Number,
    default: 0
  },
  availability: [String] // e.g., ["Monday", "Wednesday"]
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);

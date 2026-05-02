const Doctor = require('../models/Doctor');

// @desc    Add new doctor
// @route   POST /api/doctors
const addDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all doctors
// @route   GET /api/doctors
const getDoctors = async (req, res) => {
  const doctors = await Doctor.find().populate('hospital', 'name location');
  res.json(doctors);
};

module.exports = { addDoctor, getDoctors };

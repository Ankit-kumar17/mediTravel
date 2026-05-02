const Hospital = require('../models/Hospital');

// @desc    Add new hospital
// @route   POST /api/hospitals
const addHospital = async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body);
    res.status(201).json(hospital);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all hospitals
// @route   GET /api/hospitals
const getHospitals = async (req, res) => {
  const hospitals = await Hospital.find();
  res.json(hospitals);
};

module.exports = { addHospital, getHospitals };

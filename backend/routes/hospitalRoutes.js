const express = require('express');
const { addHospital, getHospitals } = require('../controllers/hospitalController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getHospitals)
  .post(protect, addHospital);

module.exports = router;

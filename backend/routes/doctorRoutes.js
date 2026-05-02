const express = require('express');
const { addDoctor, getDoctors } = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getDoctors)
  .post(protect, addDoctor);

module.exports = router;

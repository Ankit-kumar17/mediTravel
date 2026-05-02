const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);

// Profile routes
router.get('/me', protect, async (req, res) => {
  res.json(req.user);
});

router.put('/profile', protect, require('../controllers/authController').updateUserProfile);

module.exports = router;

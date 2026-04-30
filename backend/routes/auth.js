const express = require('express');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    // Create user
    const user = await User.create({
      fullName,
      email,
      password,
      authProvider: 'local',
    });

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages[0] });
    }
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if user signed up with Google
    if (user.authProvider === 'google' && !user.password) {
      return res.status(401).json({ message: 'This account uses Google Sign-In. Please sign in with Google.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// @route   POST /api/auth/google
// @desc    Google OAuth login/register
// @access  Public
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Find or create user
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      // Update Google ID if not set (user previously signed up with email)
      if (!user.googleId) {
        user.googleId = googleId;
        user.authProvider = 'google';
        if (picture) user.avatar = picture;
        await user.save();
      }
    } else {
      user = await User.create({
        fullName: name,
        email,
        googleId,
        avatar: picture || '',
        authProvider: 'google',
      });
    }

    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({ message: 'Google authentication failed' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, async (req, res) => {
  res.json({
    _id: req.user._id,
    fullName: req.user.fullName,
    email: req.user.email,
    avatar: req.user.avatar,
  });
});

module.exports = router;

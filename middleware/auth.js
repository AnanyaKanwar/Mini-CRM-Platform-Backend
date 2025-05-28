// const jwt = require('jsonwebtoken');

// module.exports = function (req, res, next) {
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.id;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };


const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

require('../utils/passport'); // Google strategy

// Start Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Generate JWT
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    // Redirect to frontend with token query param
    const frontendURL = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${frontendURL}/login?token=${token}`);
  }
);



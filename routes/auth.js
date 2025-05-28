// const express = require('express');
// const passport = require('passport');
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const router = express.Router();

// require('../utils/passport'); // Google strategy

// // Start Google OAuth
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Google OAuth callback (adjusted for testing)
// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
//   // Generate JWT and send as JSON
//   const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//   res.json({ token }); // For easy copy-paste in Postman
// });

// module.exports = router;



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



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



router.get('/me', async (req, res) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find user by id
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});
module.exports = router;




// // routes/profile.js
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User'); // Assuming you have a User model
// const verifyToken = require('../middleware/verifyToken'); // Middleware for verifying JWT

// // Get user profile
// router.get('/profile', verifyToken, async (req, res) => {
//   try {
//     const userId = req.user.id; // Get user ID from the JWT token
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({
//       name: user.fullName, // Assuming you have fullName in your User model
//       email: user.email,
//       profilePic: user.profilePic, // If you store profile picture in DB
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

const express = require('express');
const User = require('../models/user.model');

const router = express.Router();

// @route   GET /api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', async (req, res, next) => {
  try {
    // User is already attached to req from auth middleware
    const user = await User.findById(req.user._id)
      .select('-password')
      .populate('projects');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/users/me
// @desc    Update user profile
// @access  Private
router.put('/me', async (req, res, next) => {
  try {
    const { name, country } = req.body;
    
    // Find and update user
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, country },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

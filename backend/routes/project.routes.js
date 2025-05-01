const express = require('express');
const Project = require('../models/project.model');
const User = require('../models/user.model');

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects for current user
// @access  Private
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find({ user: req.user._id })
      .populate('tasks');
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/projects/:id
// @desc    Get single project by ID
// @access  Private
router.get('/:id', async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('tasks');
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private
router.post('/', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    
    // Check if user already has 4 projects
    const userWithProjects = await User.findById(req.user._id).populate('projects');
    if (userWithProjects.projects.length >= 4) {
      return res.status(400).json({
        success: false,
        message: 'You can only have up to 4 projects'
      });
    }
    
    // Create project
    const project = await Project.create({
      title,
      description,
      user: req.user._id
    });
    
    // Add project to user's projects
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { projects: project._id } }
    );
    
    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/projects/:id
// @desc    Update a project
// @access  Private
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description } = req.body;
    
    // Find and update project
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description },
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private
router.delete('/:id', async (req, res, next) => {
  try {
    // Find project
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }
    
    // Remove project from user's projects
    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { projects: project._id } }
    );
    
    // Delete project
    await project.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

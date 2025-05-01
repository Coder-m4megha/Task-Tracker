const express = require('express');
const Task = require('../models/task.model');
const Project = require('../models/project.model');

const router = express.Router();

// @route   GET /api/tasks
// @desc    Get all tasks for current user (across all projects)
// @access  Private
router.get('/', async (req, res, next) => {
  try {
    // Find all projects for the user
    const projects = await Project.find({ user: req.user._id }).select('_id');
    const projectIds = projects.map(project => project._id);
    
    // Find all tasks for these projects
    const tasks = await Task.find({ project: { $in: projectIds } })
      .populate('project', 'title');
    
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/tasks/:id
// @desc    Get single task by ID
// @access  Private
router.get('/:id', async (req, res, next) => {
  try {
    // Find task
    const task = await Task.findById(req.params.id)
      .populate('project');
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Check if task belongs to a project owned by the user
    const project = await Project.findOne({
      _id: task.project,
      user: req.user._id
    });
    
    if (!project) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this task'
      });
    }
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', async (req, res, next) => {
  try {
    const { title, description, projectId } = req.body;
    
    // Check if project exists and belongs to user
    const project = await Project.findOne({
      _id: projectId,
      user: req.user._id
    });
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or not authorized'
      });
    }
    
    // Create task
    const task = await Task.create({
      title,
      description,
      project: projectId
    });
    
    // Add task to project's tasks
    await Project.findByIdAndUpdate(
      projectId,
      { $push: { tasks: task._id } }
    );
    
    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    
    // Find task
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Check if task belongs to a project owned by the user
    const project = await Project.findOne({
      _id: task.project,
      user: req.user._id
    });
    
    if (!project) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }
    
    // Update task
    task.title = title || task.title;
    task.description = description || task.description;
    
    // Only update status if it's provided and different
    if (status && status !== task.status) {
      task.status = status;
    }
    
    await task.save();
    
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', async (req, res, next) => {
  try {
    // Find task
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Check if task belongs to a project owned by the user
    const project = await Project.findOne({
      _id: task.project,
      user: req.user._id
    });
    
    if (!project) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task'
      });
    }
    
    // Remove task from project's tasks
    await Project.findByIdAndUpdate(
      task.project,
      { $pull: { tasks: task._id } }
    );
    
    // Delete task
    await task.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

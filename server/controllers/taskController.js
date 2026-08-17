const Task = require('../models/Task');
const Joi = require('joi');

// Joi schema for task validation
const taskSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    'string.empty': 'Title is required',
    'any.required': 'Title is required',
  }),
  description: Joi.string().trim().allow('', null),
  priority: Joi.string().valid('low', 'medium', 'high'),
  status: Joi.string().valid('todo', 'in_progress', 'done'),
  dueDate: Joi.date().iso().allow(null),
});

// @desc    Get all tasks
// @route   GET /tasks
// @access  Public
const getTasks = async (req, res, next) => {
  try {
    const { status, sortBy } = req.query;
    
    // Build query
    const query = {};
    if (status) {
      query.status = status;
    }

    // Build sort
    let sortQuery = { createdAt: -1 }; // Default sort by newest
    if (sortBy === 'dueDate') {
      sortQuery = { dueDate: 1 }; // Ascending
    } else if (sortBy === 'priority') {
      // Map priority to numerical value for sorting if needed, but MongoDB sorts alphabetically by default.
      // Better to sort on client or use an aggregation pipeline, but we'll stick to simple sort for now.
      sortQuery = { priority: -1 }; 
    }

    const tasks = await Task.find(query).sort(sortQuery);
    
    // If priority sort, we might need a custom sort because 'low', 'medium', 'high' alphabetical isn't right.
    // For simplicity, let's sort in JS if sortBy is priority
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    }

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task
// @route   GET /tasks/:id
// @access  Public
const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a task
// @route   POST /tasks
// @access  Public
const createTask = async (req, res, next) => {
  try {
    // Validate request body
    const { error } = taskSchema.validate(req.body);
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }

    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a task
// @route   PUT /tasks/:id
// @access  Public
const updateTask = async (req, res, next) => {
  try {
    // Validate request body
    const updateSchema = taskSchema.fork(['title'], (schema) => schema.optional());
    const { error } = updateSchema.validate(req.body, { allowUnknown: true }); // allow other fields not to be updated if partial
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }

    let task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /tasks/:id
// @access  Public
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};

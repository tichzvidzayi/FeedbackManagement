const Feedback = require('../models/Feedback');

// Submit feedback
exports.submitFeedback = async (req, res, next) => {
  try {
    const { message } = req.body;

    // Check if message is provided
    if (!message) {
      return res.status(400).json({ success: false, message: 'Please provide feedback message' });
    }

    // Create new feedback
    const feedback = await Feedback.create({ user: req.user.id, message });

    res.status(201).json({ success: true, data: feedback });
  } catch (error) {
    next(error);
  }
};

// Get all feedback
exports.getAllFeedback = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find().populate('user', 'username');
    res.status(200).json({ success: true, data: feedbacks });
  } catch (error) {
    next(error);
  }
};

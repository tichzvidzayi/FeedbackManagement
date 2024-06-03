const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const { feedback } = req.body;
    const newFeedback = new Feedback({ feedback });
    await newFeedback.save();
    res.status(201).json({ success: true, message: 'Feedback submitted successfully.' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ success: false, message: 'Failed to submit feedback.' });
  }
};

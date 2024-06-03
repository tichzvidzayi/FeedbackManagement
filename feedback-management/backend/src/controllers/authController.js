const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const User = require('../models/User');

// User login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Find user by email
    const user = await User.findOne({ email }).select('+password');

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, config.secretKey, { expiresIn: '1h' });

    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

// User registration
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if username, email, and password are provided
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username, email, and password' });
    }

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({ username, email, password: hashedPassword });

    // Generate token
    const token = jwt.sign({ id: user._id }, config.secretKey, { expiresIn: '1h' });

    res.status(201).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

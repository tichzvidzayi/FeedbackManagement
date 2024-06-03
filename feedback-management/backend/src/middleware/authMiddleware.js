const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    req.user = { id: decoded.id };
    next();
  });
};

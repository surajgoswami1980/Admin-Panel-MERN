// middleware/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  // Get token from header
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).send('Access Denied');

  // Check if the token uses "Bearer" prefix and extract the token
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;  // Attach verified user info to req.user
    next();
  } catch (err) {
    res.status(400).send('Invalid Token ');
  }
};


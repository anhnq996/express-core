const jwt = require('jsonwebtoken');
const i18n = require('i18n');

function authMiddleware(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: res.__('No token, authorization denied') });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: res.__('Token is not valid') });
  }
}

module.exports = authMiddleware;
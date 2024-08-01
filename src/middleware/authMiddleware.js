const jwt = require('jsonwebtoken');
const i18n = require('i18n');
const { formatResponse, ErrorCodes, ErrorStatus } = require('../utils/response');

function authMiddleware(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    res.status(ErrorStatus.UNAUTHORIZED).json(formatResponse(false, ErrorCodes.E5000, res.__('No token, authorization denied'), null, null, {}));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(ErrorStatus.UNAUTHORIZED).json(formatResponse(false, ErrorCodes.E5000, res.__('Token is not valid'), null, null, {}));
  }
}

module.exports = authMiddleware;
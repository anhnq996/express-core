const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const UserResource = require('../resources/userResource');
const { formatResponse, SuccessCodes, ErrorCodes, ErrorStatus } = require('../utils/response');

class AuthController {
  async register(req, res) {
    try {
      const user = await userService.registerUser(req.body);
      res.status(SuccessCodes.CREATED).json(formatResponse(true, SuccessCodes.S1000, res.__('User registered successfully'), UserResource.format(user)));
    } catch (error) {
      res.status(ErrorStatus.INTERNAL_SERVER_ERROR).json(formatResponse(false, ErrorCodes.E5000, res.__('An error occurred'), null, null, error.stack));
    }
  }

  async login(req, res) {
    try {
      const user = await userService.loginUser(req.body);
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json(formatResponse(true, SuccessCodes.S1000, res.__('Login successful'), { token, user: UserResource.format(user) }));
    } catch (error) {
      res.status(ErrorStatus.UNAUTHORIZED).json(formatResponse(false, ErrorCodes.E5000, res.__('invalid_credentials'), null, null, error.stack));
    }
  }

  async getProfile(req, res) {
    try {
      const user = await userService.getUserById(req.user.userId);
      res.json(formatResponse(true, SuccessCodes.S1000, res.__('Profile retrieved successfully'), UserResource.format(user)));
    } catch (error) {
      res.status(ErrorStatus.INTERNAL_SERVER_ERROR).json(formatResponse(false, ErrorCodes.E5000, res.__('An error occurred'), null, null, error.stack));
    }
  }
}

module.exports = new AuthController();

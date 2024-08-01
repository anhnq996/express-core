const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

class AuthController {
  async register(req, res) {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  }

  async login(req, res) {
    try {
      const user = await userService.loginUser(req.body);
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(401).json({ message: res.__('invalid_credentials') });
    }
  }

  async getProfile(req, res) {
    const user = await userService.getUserById(req.user.userId);
    res.json(user);
  }
}

module.exports = new AuthController();

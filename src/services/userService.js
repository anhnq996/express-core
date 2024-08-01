const User = require('../models/user');
const bcrypt = require('bcryptjs');

class UserService {
  async registerUser(data) {
    const { username, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    return await user.save();
  }

  async loginUser(data) {
    const { username, password } = data;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw new Error('Invalid credentials');
  }

  async getUserById(id) {
    return await User.findById(id);
  }
}

module.exports = new UserService();

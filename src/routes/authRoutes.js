const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerUserRequest, loginUserRequest } = require('../requests/userRequests');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUserRequest, authController.register);
router.post('/login', loginUserRequest, authController.login);
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;
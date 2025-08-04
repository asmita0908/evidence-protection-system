const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

const { signup, login,verify2FA,resetPassword } = require('../controllers/userController');

// Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-2fa', verify2FA); // ✅ Important: ye line honi chahiye
router.post('/reset-password',userController.resetPassword);
module.exports = router;
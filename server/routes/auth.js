const express = require('express');
const { body } = require('express-validator');
const { adminLogin, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');
const router = express.Router();
router.post('/login', authLimiter, [body('username').trim().notEmpty(), body('password').notEmpty()], adminLogin);
router.get('/profile', protect, getProfile);
module.exports = router;

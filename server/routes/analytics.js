const express = require('express');
const { trackEvent } = require('../controllers/analyticsController');
const { generalLimiter } = require('../middleware/rateLimiter');
const router = express.Router();
router.post('/track', generalLimiter, trackEvent);
module.exports = router;

const express = require('express');
const router  = express.Router();
const { chat, chatLimiter } = require('../controllers/aiChatController');

// POST /api/ai/chat
router.post('/chat', chatLimiter, chat);

module.exports = router;

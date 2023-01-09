const { Router } = require('express');
const chatRouter = Router();
const { chat } = require('../controllers/chatController');

chatRouter.get('/', chat);

module.exports = chatRouter;

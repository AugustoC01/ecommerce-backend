const express = require('express');
const chatRouter = express.Router();
const getChat = require('../controllers/msgController');

chatRouter.get('/', getChat);

module.exports = chatRouter;

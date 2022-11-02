const express = require('express');
const randomRouter = express.Router();
const { randomNumbers } = require('../controllers/randomController');
const { fork } = require('child_process');

randomRouter.get('/api/randoms', randomNumbers);

module.exports = randomRouter;

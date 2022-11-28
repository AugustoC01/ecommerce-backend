const { Router } = require('express');
const randomRouter = Router();
const { randomNumbers } = require('../controllers/randomController');
const { fork } = require('child_process');

randomRouter.get('/api/random', randomNumbers);

module.exports = randomRouter;

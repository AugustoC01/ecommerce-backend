const express = require('express');
const infoRouter = express.Router();
const { getInfo } = require('../controllers/infoController');

infoRouter.get('/info', getInfo);

module.exports = infoRouter;

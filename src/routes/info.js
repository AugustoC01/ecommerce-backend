const { Router } = require('express');
const infoRouter = Router();
const { getInfo } = require('../controllers/infoController');

infoRouter.get('/info', getInfo);

module.exports = infoRouter;

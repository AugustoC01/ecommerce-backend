const express = require('express');
const prodsRouter = express.Router();
const getProducts = require('../controllers/productsController');

prodsRouter.get('/', getProducts);

module.exports = prodsRouter;

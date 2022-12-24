const { Router } = require('express');
const prodsRouter = Router();
const { getAllProducts } = require('../controllers/productsController');

prodsRouter.get('/', getAllProducts);

module.exports = prodsRouter;

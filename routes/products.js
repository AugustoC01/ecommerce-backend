const { Router } = require('express');
const prodsRouter = Router();
const { getProducts } = require('../controllers/productsController');

prodsRouter.get('/api/products-test', getProducts);

module.exports = prodsRouter;

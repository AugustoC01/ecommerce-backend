const { Router } = require('express');
const prodsRouter = Router();
const { getAllProducts } = require('../controllers/productsController');

prodsRouter.get('/api/products-test', getAllProducts);

module.exports = prodsRouter;

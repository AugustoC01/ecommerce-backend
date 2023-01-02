const { Router } = require('express');
const prodsRouter = Router();
const { getAllProducts } = require('../controllers/productsController');

prodsRouter.get('/', getAllProducts);
prodsRouter.get('/:category', getAllProducts);
// prodsRouter.post('/', createProduct);
// prodsRouter.get('/:prodId', getProduct);

module.exports = prodsRouter;

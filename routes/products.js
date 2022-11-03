const express = require('express');
const prodsRouter = express.Router();
const {
  getProducts,
  logout,
  checkAuth,
} = require('../controllers/productsController');

prodsRouter.get('/api/products-test', checkAuth, getProducts);

prodsRouter.post('/api/products-test', logout);

module.exports = prodsRouter;

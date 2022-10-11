const express = require('express');
const prodsRouter = express.Router();
const { isLogued } = require('../controllers/loginController');
const { getProducts, logout } = require('../controllers/productsController');

prodsRouter.get('/api/products-test', isLogued, getProducts);

prodsRouter.post('/api/products-test', logout);

module.exports = prodsRouter;

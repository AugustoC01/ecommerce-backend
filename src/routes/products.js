const { Router } = require('express');
const prodsRouter = Router();
const {
  getAll,
  getOne,
  createProd,
} = require('../controllers/productsController');

prodsRouter.get('/', getAll);
prodsRouter.get('/:categoria', getAll);
prodsRouter.get('/prod/:id', getOne);
prodsRouter.post('/', createProd);

module.exports = prodsRouter;

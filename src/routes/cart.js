const { Router } = require('express');
const cartRouter = Router();
const {
  getCart,
  sendCart,
  addToCart,
  removeFromCart,
  deleteCart,
} = require('../controllers/cartController');

cartRouter.get('/', getCart);
cartRouter.post('/', sendCart, deleteCart);
cartRouter.post('/:prodId', addToCart);
cartRouter.delete('/:prodId', removeFromCart);
cartRouter.delete('/', deleteCart);

module.exports = cartRouter;

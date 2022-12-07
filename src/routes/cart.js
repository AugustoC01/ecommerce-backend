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
cartRouter.post('/product/:prodId', addToCart);
cartRouter.post('/:prodId', removeFromCart);
// cartRouter.post('/:cartId', deleteCart);

module.exports = cartRouter;

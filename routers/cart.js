const express = require('express');
const { CartsDao } = require('../daos/mainDao');
const cartsRouter = express.Router();

const carts = new CartsDao();

cartsRouter.post('/', async (req, res) => {
  try {
    const cart = await carts.newCart();
    res.status(200).json({ status: 200, data: cart.id, msg: 'Carrito creado' });
  } catch (e) {
    console.log(e);
  }
});

cartsRouter.post('/:id/products', async (req, res) => {
  const { id } = req.params;
  const { prodId } = req.body;
  try {
    const cart = await carts.addProdToCart(id, prodId);
    res.status(200).json({ status: 200, data: cart, msg: 'Producto agregado' });
  } catch (e) {
    console.log(e);
  }
});

cartsRouter.get('/:id/products', async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await carts.getCartById(id);
    cart
      ? res.status(200).json({
          status: 200,
          data: cart.products,
          msg: 'Productos del carrito',
        })
      : res.status(404).json({ status: 404, msg: 'No se encontro el carrito' });
  } catch (e) {
    console.log(e);
  }
});

cartsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await carts.deleteCartById(id);
    res.status(200).json({ status: 200, msg: `Carrito eliminado` });
  } catch (e) {
    console.log(e);
  }
});

cartsRouter.delete('/:id/products/:prodId', async (req, res) => {
  const { id, prodId } = req.params;
  try {
    const cart = await carts.deleteProdFromCart(id, prodId);
    res
      .status(200)
      .json({ status: 200, data: cart, msg: `Producto eliminado` });
  } catch (e) {
    console.log(e);
  }
});

module.exports = cartsRouter;

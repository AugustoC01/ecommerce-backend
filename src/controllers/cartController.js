const {
  getCartData,
  addProdToCart,
  removeProd,
  removeAll,
  sendCartData,
} = require('../services/cartService');

const addToCart = async (req, res) => {
  let { cartId, _id: userId } = req.user;
  const { prodId } = req.params;
  await addProdToCart(cartId, userId, prodId);
  res.status(200).redirect('/api/products-test');
};

const getCart = async (req, res) => {
  const { cartId } = req.user;
  data = await getCartData(cartId);
  res.status(200).render('mainCart', data);
};

const deleteCart = async (req, res) => {
  const { cartId } = req.user;
  await removeAll(cartId);
  res.status(200).redirect('/cart');
};

const sendCart = async (req, res, next) => {
  const { name, email, cartId } = req.user;
  await sendCartData(name, email, cartId);
  res.status(200).json('Enviado y borrado');
};

const removeFromCart = async (req, res) => {
  const { prodId } = req.params;
  const { cartId } = req.user;
  await removeProd(cartId, prodId);
  res.status(200).redirect('/cart');
};

module.exports = { getCart, sendCart, addToCart, deleteCart, removeFromCart };

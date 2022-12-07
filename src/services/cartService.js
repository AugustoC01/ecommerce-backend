const {
  newCart,
  getCartById: getCart,
  addProdToCart: addProd,
  deleteCartById: deleteCart,
  deleteProdFromCart: deletProd,
} = require('../daos/cartsDao');
const { addUserCart, resetUserCart } = require('../daos/userDao');
const { sendWpp, sendSms, sendEmail } = require('./msgService');

const addProdToCart = async (cartId, userId, prodId) => {
  if (!cartId) {
    cartId = await newCart(userId);
    await addUserCart(userId, cartId);
  }
  await addProd(cartId, prodId);
};

const getCartData = async (cartId) => {
  if (!cartId) return { logued: true, cart: false };
  const cart = await getCart(cartId);
  const productsList = cart.products;
  if (productsList.length == 0) return { logued: true, cart: false };
  const total = productsList.reduce((total, prod) => total + prod.price, 0);
  const products = productsList.map((prod) => {
    return {
      id: prod._id,
      title: prod.title,
      price: prod.price,
    };
  });
  return {
    logued: true,
    cart: true,
    products,
    total,
  };
};

const removeProd = async (cartId, prodId) => {
  await deletProd(cartId, prodId);
};

const removeAll = async (cartId) => {
  await deleteCart(cartId);
  await resetUserCart(cartId);
};

const sendCartData = async (name, email, cartId) => {
  cart = await getCartData(cartId);
  const products = cart.products.reduce(
    (prods, prod) => prods + '' + prod.title,
    'Lista de productos:'
  );
  const subject = `Nuevo pedido de ${name} ${email}`;
  const msg = 'Su pedido ha sido recibido y se encuentra en proceso';
  sendWpp(subject);
  sendSms(msg);
  sendEmail(subject, products);
  removeAll(cartId);
};

module.exports = {
  addProdToCart,
  getCartData,
  removeProd,
  removeAll,
  sendCartData,
};

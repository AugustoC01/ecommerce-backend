const { Factory } = require('../daos/mainDao');
const DaoFactory = new Factory();
const Carts = DaoFactory.createDao('Carts');
const Users = DaoFactory.createDao('Users');
const Products = DaoFactory.createDao('Products');

const { sendWpp, sendSms, sendEmail } = require('./msgService');
const { createOrder } = require('./orderService');

const createCart = async (userId) => {
  const user = await Users.getUser(userId);
  const address = user.address;
  const cartId = await Carts.newCart(userId, address);
  await Users.addUserCart(userId, cartId);
  return cartId;
};

const addProd = async (cartId, userId, prodId) => {
  if (!cartId) {
    cartId = await createCart(userId);
  }
  const prod = await Products.getById(prodId);
  await Carts.addProdToCart(cartId, prod);
};

const getCartData = async (cartId) => {
  if (!cartId) return { cart: false };
  const cart = await Carts.getCartById(cartId);
  const productsList = cart.products;
  if (productsList.length == 0) return { cart: false };
  const total = productsList.reduce((total, prod) => total + prod.price, 0);
  const products = productsList.map((prod) => {
    return {
      id: prod._id,
      title: prod.title,
      price: prod.price,
    };
  });
  return {
    cart: true,
    products,
    total,
  };
};

const removeProd = async (cartId, prodId) => {
  const prod = await Products.getById(prodId);
  await Carts.deleteProdFromCart(cartId, prod);
};

const removeAll = async (cartId) => {
  await createOrder(cartId);
  await Carts.deleteCartById(cartId);
  await Users.resetUserCart(cartId);
};

const sendCartData = async (name, email, cartId) => {
  const cart = await getCartData(cartId);
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
  addProd,
  getCartData,
  removeProd,
  removeAll,
  sendCartData,
};

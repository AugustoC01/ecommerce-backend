const {
  newCart,
  getCartById,
  addProdToCart,
  deleteCartById,
  deleteProdFromCart,
} = require('../daos/cartsDao');
const { addUserCart, resetUserCart } = require('../daos/userDao');
const { sendWpp, sendSms, sendEmail } = require('../middlewares/twilio');

const addToCart = async (req, res) => {
  let { cartId, _id: userId } = req.user;
  if (!cartId) {
    cartId = await newCart(userId);
    await addUserCart(userId, cartId);
  }
  const prodId = req.params.prodId;
  await addProdToCart(cartId, prodId);
  res.status(200).redirect('/api/products-test');
};

const getCart = async (req, res) => {
  const { cartId } = req.user;
  data = await getCartData(cartId);
  res.status(200).render('mainCart', data);
};

const deleteCart = async (req, res) => {
  const { cartId } = req.user;
  await deleteCartById(cartId);
  await resetUserCart(cartId);
  res.status(200).render('mainCart', {
    data: { logued: true },
    cart: false,
  });
};

const getCartData = async (cartId) => {
  if (cartId == '') return { data: { logued: true }, cart: false };
  const cart = await getCartById(cartId);
  const productsList = cart.products;
  if (productsList.length == 0) return { data: { logued: true }, cart: false };
  const total = productsList.reduce((total, prod) => total + prod.price, 0);
  const products = productsList.map((prod) => {
    return {
      id: prod._id,
      title: prod.title,
      price: prod.price,
    };
  });
  return {
    data: { logued: true },
    cart: true,
    products,
    total,
  };
};

const sendCart = async (req, res, next) => {
  const { name, email, cartId } = req.user;
  cart = await getCartData(cartId);
  const products = cart.products.reduce(
    (prods, prod) => prods + ' ' + prod.title,
    'Lista de productos:'
  );
  const data = { name, email, products };
  handleMsg(data);
  next();
};

const handleMsg = (data) => {
  const subject = `Nuevo pedido de ${data.name} ${data.email}`;
  const body = data.products;
  const msg = 'Su pedido ha sido recibido y se encuentra en proceso';
  sendWpp(subject);
  sendSms(msg);
  sendEmail(subject, body);
};

const removeFromCart = async (req, res) => {
  const { prodId } = req.params;
  const { cartId } = req.user;
  await deleteProdFromCart(cartId, prodId);
  data = await getCartData(cartId);
  res.status(200).render('mainCart', data);
};

module.exports = { getCart, sendCart, addToCart, deleteCart, removeFromCart };

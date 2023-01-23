const { Factory } = require("../daos/mainDao");
const DaoFactory = new Factory();
const Carts = DaoFactory.createDao("Carts");
const Users = DaoFactory.createDao("Users");
const Products = DaoFactory.createDao("Products");
const { prodToCart } = require("./productService");

const { sendWpp, sendSms, sendEmail } = require("./msgService");
const { createOrder } = require("./orderService");

const createCart = async (userId) => {
  const user = await Users.getUser(userId);
  const cartId = await Carts.newCart(userId, user.address);
  await Users.addUserCart(userId, cartId);
  return cartId;
};

const addProd = async (cartId, userId, prodId, quantity) => {
  if (!cartId) {
    cartId = await createCart(userId);
  }
  const prodInCart = await isInCart(cartId, prodId);
  const prod = await prodToCart(prodId);
  await Carts.addProdToCart(cartId, prod, prodInCart, quantity);
};

const getCartData = async (cartId) => {
  if (!cartId) return { cart: false };
  const cart = await Carts.getCartById(cartId);
  let productsList;
  try {
    productsList = cart.products;
  } catch (error) {
    return { cart: false };
  }
  if (productsList.length == 0) return { cart: false };
  const total = productsList.reduce(
    (total, prod) => total + prod.price * prod.quantity,
    0
  );
  const products = productsList.map((prod) => {
    return {
      id: prod.id,
      title: prod.title,
      price: prod.price,
      quantity: prod.quantity,
      subTotal: prod.quantity * prod.price,
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
    (prods, prod) => prods + "" + prod.title,
    "Lista de productos: "
  );
  const subject = `Nuevo pedido de ${name} ${email}`;
  const msg = "Su pedido ha sido recibido y se encuentra en proceso";
  // sendWpp(subject);
  // sendSms(msg);
  // sendEmail(subject, products);
  removeAll(cartId);
};

const isInCart = async (cartId, prodId) => {
  const cart = await getCartData(cartId);
  if (cart.products) {
    const prod = cart.products.find((prod) => prod.id == prodId);
    if (prod) return true;
  }
  return false;
};

module.exports = {
  addProd,
  getCartData,
  removeProd,
  removeAll,
  sendCartData,
};

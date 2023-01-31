const { Factory } = require("../daos/mainDao");
const DaoFactory = new Factory();
const Carts = DaoFactory.createDao("Carts");
const Users = DaoFactory.createDao("Users");
const Products = DaoFactory.createDao("Products");
const { prodToCart, updateStock } = require("./productService");

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
  const productsList = cart.products;
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
  await Carts.deleteProdFromCart(cartId, prodId);
};

const removeAll = async (cartId) => {
  await Carts.deleteCartById(cartId);
  await Users.resetUserCart(cartId);
};

const handleCart = async (name, email, cartId) => {
  try {
    await stockCheck(cartId);
    // await sendCartData(name, email, cartId);
    await createOrder(cartId);
    getNewStock(cartId);
    await removeAll(cartId);
  } catch (error) {
    return error;
  }
};

const sendCartData = async (name, email, cartId) => {
  const cart = await Carts.getCartById(cartId);
  const products = cart.products.reduce(
    (prods, prod) => prods + "" + prod.quantity + "x" + prod.title + " ",
    "Lista de productos: "
  );
  const subject = `Nuevo pedido de ${name} ${email}`;
  const msg = "Su pedido ha sido recibido y se encuentra en proceso";
  sendWpp(subject);
  sendSms(msg);
  sendEmail(subject, products);
};

const isInCart = async (cartId, prodId) => {
  const cart = await Carts.getCartById(cartId);
  if (cart.products.length > 0) {
    const prod = cart.products.find((prod) => prod.id == prodId);
    if (prod) return true;
  }
  return false;
};

const stockCheck = async (cartId) => {
  const cart = await Carts.getCartById(cartId);
  for (const prod of cart.products) {
    const product = await Products.getById(prod.id);
    if (prod.quantity > product.stock) {
      throw Error(`${prod.title} sin stock suficiente`);
    }
  }
};

const getNewStock = async (cartId) => {
  const cart = await Carts.getCartById(cartId);
  for (const prod of cart.products) {
    const product = await Products.getById(prod.id);
    const newStock = product.stock - prod.quantity;
    await updateStock(prod.id, { stock: newStock });
  }
};

module.exports = {
  handleCart,
  addProd,
  getCartData,
  removeProd,
  removeAll,
};

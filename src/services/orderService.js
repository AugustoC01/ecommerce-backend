const { Factory } = require('../daos/mainDao');
const DaoFactory = new Factory();
const Carts = DaoFactory.createDao('Carts');
const Users = DaoFactory.createDao('Users');
const Orders = DaoFactory.createDao('Orders');

const createOrder = async (cartId) => {
  const order = {
    items: await getCartProducts(cartId),
    email: await findUserEmail(cartId),
  };
  Orders.newOrder(order);
};

const findUserEmail = async (id) => {
  try {
    const cart = await Carts.getCartById(id);
    const userId = cart.userId;
    const user = await Users.getUser(userId);
    return user.email;
  } catch (e) {
    errorLogger(e);
  }
};

const getCartProducts = async (id) => {
  try {
    const cart = await Carts.getCartById(id);
    return cart.products;
  } catch (e) {
    errorLogger(e);
  }
};

module.exports = { createOrder };

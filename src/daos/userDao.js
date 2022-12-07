const Users = require('../models/userSchema');

const addUserCart = async (userId, cartId) => {
  return await Users.findByIdAndUpdate(userId, { cartId: cartId });
};

const resetUserCart = async (cartId) => {
  return await Users.findOneAndUpdate({ cartId: cartId }, { cartId: '' });
};

module.exports = { addUserCart, resetUserCart };

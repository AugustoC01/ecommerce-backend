const Users = require('../models/userSchema');

class UsersDao {
  async addUserCart(userId, cartId) {
    return await Users.findByIdAndUpdate(userId, { cartId: cartId });
  }

  async resetUserCart(cartId) {
    return await Users.findOneAndUpdate({ cartId: cartId }, { cartId: '' });
  }
}

module.exports = UsersDao;

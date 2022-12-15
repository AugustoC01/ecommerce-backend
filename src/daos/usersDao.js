const Users = require('../models/userSchema');

let instance = null;
class UsersDao {
  static getInstance() {
    if (!instance) instance = new UsersDao();
    return instance;
  }

  async addUserCart(userId, cartId) {
    return await Users.findByIdAndUpdate(userId, { cartId: cartId });
  }

  async resetUserCart(cartId) {
    return await Users.findOneAndUpdate({ cartId: cartId }, { cartId: '' });
  }
}

module.exports = UsersDao;

const Users = require('../models/userSchema');
const { checkValue } = require('../helpers/checkValue');
const { errorLogger } = require('../helpers/logger');

let instance = null;
class UsersDao {
  static getInstance() {
    if (!instance) instance = new UsersDao();
    return instance;
  }

  async getUser(userId) {
    try {
      return await Users.findById(userId);
    } catch (e) {
      errorLogger(e);
    }
  }

  async addUserCart(userId, cartId) {
    try {
      return await Users.findByIdAndUpdate(userId, { cartId: cartId });
    } catch (e) {
      errorLogger(e);
    }
  }

  async resetUserCart(cartId) {
    try {
      return await Users.findOneAndUpdate({ cartId: cartId }, { cartId: '' });
    } catch (e) {
      errorLogger(e);
    }
  }

  //TIRA ERROR SI FALTA ALGUN DATO O SI EL TIPO DE DATO ES INCORRECTO
  static validate(required, user) {
    const obj = {
      email: checkValue(required, user.email, 'string'),
      password: checkValue(required, user.password, 'string'),
      name: checkValue(required, user.email, 'string'),
      address: checkValue(required, user.address, 'string'),
      age: checkValue(required, user.age, 'number'),
      phone: checkValue(required, user.phone, 'number'),
    };
    for (const i in obj) {
      if (obj[i]) {
        throw obj[i];
      }
    }
  }
}

module.exports = UsersDao;

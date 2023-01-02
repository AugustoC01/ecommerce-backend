const Users = require('../models/userSchema');
const { checkValue } = require('../helpers/checkValue');

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

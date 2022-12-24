const { NODE_ENV } = require('../config');
const CartsDao = require('./cartsDao');
const UsersDao = require('./usersDao');

let ProductsDao;
NODE_ENV == 'test'
  ? (ProductsDao = require('./productsDao'))
  : (ProductsDao = require('./productsDaoFire'));

class Factory {
  createDao(type) {
    if (type == 'Products') return ProductsDao.getInstance();
    if (type == 'Carts') return CartsDao.getInstance();
    if (type == 'Users') return UsersDao.getInstance();
  }
}

module.exports = { Factory, CartsDao, ProductsDao, UsersDao };

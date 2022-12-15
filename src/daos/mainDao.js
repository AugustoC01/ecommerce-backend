const CartsDao = require('./cartsDao');
const ProductsDao = require('./productsDao');
const UsersDao = require('./usersDao');

class Factory {
  createDao(type) {
    if (type == 'Products') return ProductsDao.getInstance();
    if (type == 'Carts') return CartsDao.getInstance();
    if (type == 'Users') return UsersDao.getInstance();
  }
}

module.exports = { Factory, CartsDao, ProductsDao, UsersDao };

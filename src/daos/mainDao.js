const CartsDao = require('./cartsDao');
const OrdersDao = require('./ordersDao');
const ProductsDao = require('./productsDao');
const UsersDao = require('./usersDao');

class Factory {
  createDao(type) {
    if (type == 'Products') return ProductsDao.getInstance();
    if (type == 'Carts') return CartsDao.getInstance();
    if (type == 'Users') return UsersDao.getInstance();
    if (type == 'Orders') return OrdersDao.getInstance();
  }
}

module.exports = { Factory };

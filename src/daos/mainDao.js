const CartsDao = require('./cartsDao');
const OrdersDao = require('./ordersDao');
const ProductsDao = require('./productsDao');
const UsersDao = require('./usersDao');
const MessagesDao = require('./messageDao');

class Factory {
  createDao(type) {
    if (type == 'Products') return ProductsDao.getInstance();
    if (type == 'Carts') return CartsDao.getInstance();
    if (type == 'Users') return UsersDao.getInstance();
    if (type == 'Orders') return OrdersDao.getInstance();
    if (type == 'Messages') return MessagesDao.getInstance();
  }
}

module.exports = { Factory };

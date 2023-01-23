const { errorLogger } = require("../helpers/logger");
const Carts = require("../models/cartSchema");

let instance = null;
class CartsDao {
  static getInstance() {
    if (!instance) instance = new CartsDao();
    return instance;
  }

  async newCart(userId, address) {
    try {
      const newCart = await Carts.create({
        userId,
        timestamp: new Date().toLocaleString(),
        address,
      });
      return newCart._id;
    } catch (e) {
      errorLogger(e);
    }
  }

  async getCartById(cartId) {
    try {
      return await Carts.findById(cartId);
    } catch (e) {
      errorLogger(e);
    }
  }

  async deleteCartById(cartId) {
    try {
      return await Carts.findByIdAndDelete(cartId);
    } catch (e) {
      errorLogger(e);
    }
  }

  async addProdToCart(cartId, prod, prodInCart, quantity) {
    try {
      if (prodInCart) {
        const cart = await Carts.findById(cartId);
        cart.products.forEach((product) => {
          if (product.id == prod.id)
            if (quantity) {
              product.quantity = product.quantity + parseInt(quantity);
            } else {
              product.quantity = product.quantity + 1;
            }
        });
        return await Carts.findByIdAndUpdate(cartId, {
          $set: cart,
        });
      } else {
        if (quantity) {
          prod.quantity = parseInt(quantity);
        } else {
          prod.quantity = 1;
        }
        return await Carts.findByIdAndUpdate(cartId, {
          $push: { products: prod },
        });
      }
    } catch (e) {
      errorLogger(e);
    }
  }

  async deleteProdFromCart(cartId, prod) {
    try {
      return await Carts.findByIdAndUpdate(cartId, {
        $pull: { products: prod },
      });
    } catch (e) {
      errorLogger(e);
    }
  }
}

module.exports = CartsDao;

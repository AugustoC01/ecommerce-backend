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

  /*   async findProd(cartId, prod) {
    try {
      const cart = await this.getCartById(cartId);
      const prodIndex = cart.products.prod.findIndex(
        (product) => product == prod
      );
      return prodIndex;
    } catch (e) {
      errorLogger(e);
    }
  }
 */
  async addProdToCart(cartId, prod) {
    try {
      return await Carts.findByIdAndUpdate(cartId, {
        $addToSet: { products: prod },
      });
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

/*   async addProdToCart(cartId, prod) {
    try {
      const index = this.findProd(cartId, prod);
      if (index == -1) {
        return await Carts.findByIdAndUpdate(cartId, {
          $addToSet: { products: { quantity: 1, prod } },
        });
      }
      const cart = Carts.findById(cartId);
      cart.products[index].quantity++;
      return await Carts.findByIdAndUpdate(cartId, cart);
    } catch (e) {
      errorLogger(e);
    }
  } */

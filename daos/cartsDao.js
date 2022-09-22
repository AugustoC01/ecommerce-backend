const admin = require('firebase-admin');
const config = require('./DB/cartFirebaseConfig.json');
const ProductsDao = require('./productsDao');

class CartsDao {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(config),
    });
  }

  async connect() {
    try {
      const db = admin.firestore();
      return await db.collection('carts');
    } catch (e) {
      console.log(e);
    }
  }

  async newCart() {
    const query = await this.connect();
    try {
      const newCart = await query.add({
        products: [],
        timestamp: new Date().toLocaleString(),
      });
      return newCart;
    } catch (e) {
      console.log(e);
    }
  }

  async getCartById(id) {
    const query = await this.connect();
    try {
      const cart = await query.doc(id).get();
      return cart.data();
    } catch (e) {
      console.log(e);
    }
  }

  async deleteCartById(id) {
    const query = await this.connect();
    try {
      return await query.doc(id).delete();
    } catch (e) {
      console.log(e);
    }
  }

  async addProdToCart(cartId, prodId) {
    const query = await this.connect();
    const products = new ProductsDao();
    try {
      const cart = query.doc(cartId);
      const prod = await products.getById(prodId);
      await cart.update({
        products: admin.firestore.FieldValue.arrayUnion(JSON.stringify(prod)),
      });
      const updatedCart = await query.doc(cartId).get();
      return updatedCart.data();
    } catch (e) {
      console.log(e);
    }
  }

  async deleteProdFromCart(cartId, prodId) {
    const query = await this.connect();
    const products = new ProductsDao();
    try {
      const cart = query.doc(cartId);
      const prod = await products.getById(prodId);
      await cart.update({
        products: admin.firestore.FieldValue.arrayRemove(JSON.stringify(prod)),
      });
      const updatedCart = await query.doc(cartId).get();
      return updatedCart.data();
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = CartsDao;

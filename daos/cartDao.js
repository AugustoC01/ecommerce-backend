const admin = require('firebase-admin');
const config = require('./DB/cartFirebaseConfig.json');
// import ProductsDao from './productsDao';
const ProductsDao = require('./productsDao');

class Cart {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(config),
    });
  }

  async connect() {
    const db = admin.frestore();
    return db.collection('carts');
  }

  async newCart() {
    const query = this.connect();
    try {
      const doc = query.doc();
      const newCart = await doc.create({
        products: [],
        timestamp: new Date().toLocaleString(),
      });
      return newCart;
    } catch (e) {
      console.log(e);
    }
  }

  async getCartById(id) {
    const query = this.connect();
    try {
      const cart = await query.doc(id).get();
      return cart.data();
    } catch (e) {
      console.log(e);
    }
  }

  async deleteCartById(id) {
    const query = this.connect();
    try {
      return await query.doc(id).delete();
    } catch (e) {
      console.log(e);
    }
  }

  async addProdToCart(cartId, prodId) {
    const query = this.connect();
    const products = new ProductsDao();
    try {
      const cart = query.doc(cartId);
      const prod = products.getById(prodId);
      return await cart.update({
        products: FieldValue.arrayUnion(prod),
      });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteProdFromCart(cartId, prodId) {
    const query = this.connect();
    const products = new ProductsDao();
    try {
      const cart = query.doc(cartId);
      const prod = products.getById(prodId);
      return await cart.update({
        products: FieldValue.arrayRemove(prod),
      });
    } catch (e) {
      console.log(e);
    }
  }
}

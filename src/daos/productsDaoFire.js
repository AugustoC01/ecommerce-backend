const { query } = require('express');
const admin = require('firebase-admin');
const { FIREBASE_AUTH } = require('../config');
const { checkValue } = require('../helpers/checkValue');
const { errorLogger } = require('../helpers/logger');

let instance = null;
class ProductsDao {
  constructor() {
    if (FIREBASE_AUTH) {
      admin.initializeApp({
        credential: admin.credential.cert(FIREBASE_AUTH),
      });
    }
  }

  static getInstance() {
    if (!instance) instance = new ProductsDao();
    return instance;
  }

  connect() {
    try {
      const db = admin.firestore();
      return db.collection('products');
    } catch (e) {
      errorLogger(e);
    }
  }

  async getAll() {
    const query = this.connect();
    try {
      const products = await query.get();
      let productsData = [];
      products.forEach((prod) => {
        productsData.push({ id: prod.id, ...prod.data() });
      });
      return productsData;
    } catch (e) {
      errorLogger(e);
    }
  }

  async getById(id) {
    try {
      const product = await query.doc(id).get();
      return product.data();
    } catch (e) {
      errorLogger(e);
    }
  }

  async save(prod) {
    const query = await this.connect();
    try {
      ProductsDao.validate(true, prod);
      prod.timestamp = new Date().toLocaleString();
      return await query.add(prod);
    } catch (e) {
      errorLogger(e);
    }
  }

  async updateById(id, body) {
    try {
      ProductsDao.validate(false, body);
      const product = await query.doc(id).get();
      return await product.update(body);
    } catch (e) {
      errorLogger(e);
    }
  }

  async deleteById(id) {
    const query = await this.connect();
    try {
      return await query.doc(id).delete();
    } catch (e) {
      errorLogger(e);
    }
  }

  //TIRA ERROR SI FALTA ALGUN DATO O SI EL TIPO DE DATO ES INCORRECTO
  static validate(required, prod) {
    const obj = {
      title: checkValue(required, prod.title, 'string'),
      price: checkValue(required, prod.price, 'number'),
      thumbnail: checkValue(required, prod.thumbnail, 'string'),
      description: checkValue(required, prod.description, 'string'),
      code: checkValue(required, prod.code, 'string'),
      stock: checkValue(required, prod.stock, 'number'),
    };
    for (const i in obj) {
      if (obj[i]) throw obj[i];
    }
  }
}

module.exports = ProductsDao;

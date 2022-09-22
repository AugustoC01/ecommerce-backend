const mongoose = require('mongoose');
const prodSchema = require('./models/products');
// import mongoose from 'mongoose';
// import prodSchema from './models/products';

class ProductsDao {
  constructor(URL) {
    this.URL =
      'mongodb+srv://admin:admin@cluster0.bjodeia.mongodb.net/ecommerce?retryWrites=true&w=majority';
  }

  async connect() {
    try {
      this.db = connect(this.URL, { useNewUrlParser: true });
    } catch (e) {
      console.log(e);
    }
  }

  async save(prod) {
    try {
      await this.connect();
      const newProd = await prodSchema.create(prod);
      const id = newProd._id;
      return id;
    } catch (e) {
      console.log(e);
    } finally {
      this.disconnect();
      console.log('desconecto');
    }
  }

  // DEVUELVE TODOS LOS PRODUCTOS
  async getAll() {
    try {
      await this.connect();
      return await prodSchema.find({});
    } catch (e) {
      console.log(e);
    } finally {
      this.disconnect();
      console.log('desconecto');
    }
  }

  // DEVUELVE UN PRODUCTO O NULL SI NO ESTA
  async getById(id) {
    try {
      await this.connect();
      return await prodSchema.findById(id);
    } catch (e) {
      console.log(e);
    } finally {
      this.disconnect();
      console.log('desconecto');
    }
  }

  // MODIFICA UN PRODUCTO, PUEDO USAR res.upsertedCount PARA VERIFICAR SI SE REALIZO
  async updateById(id) {
    try {
      await this.connect();
      return await prodSchema.findByIdAndUpdate(id, { $set: { body } });
    } catch (e) {
      console.log(e);
    } finally {
      this.disconnect();
      console.log('desconecto');
    }
  }

  //  ELIMINA UN PRODUCTO POR ID
  // REVISAR QUE DEVUELVE LA FUNCION
  async deleteById(id) {
    try {
      await this.connect();
      return await findByIdAndDelete(id);
    } catch (e) {
      console.log(e);
    } finally {
      this.disconnect();
      console.log('desconecto');
    }
  }

  async disconnect() {
    return mongoose.disconnect();
  }
}

module.exports = ProductsDao;

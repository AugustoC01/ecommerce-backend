const mongoose = require('mongoose');
const prodSchema = require('./models/products');

class ProductsDao {
  constructor() {
    this.URL =
      'mongodb+srv://admin:admin@cluster0.bjodeia.mongodb.net/ecommerce?retryWrites=true&w=majority';
  }

  async connect() {
    try {
      return await mongoose.connect(this.URL, { useNewUrlParser: true });
    } catch (e) {
      console.log(e);
    }
  }

  async save(prod) {
    try {
      await this.connect();
      prod.timestamp = new Date().toLocaleString();
      const newProd = await prodSchema.create(prod);
      const id = newProd._id;
      return id;
    } catch (e) {
      console.log(e);
    } finally {
      this.disconnect();
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
    }
  }

  // MODIFICA UN PRODUCTO
  async updateById(id, body) {
    try {
      await this.connect();
      return await prodSchema.updateOne({ _id: id }, { $set: body });
    } catch (e) {
      console.log(e);
    } finally {
      this.disconnect();
    }
  }

  //  ELIMINA UN PRODUCTO POR ID
  // REVISAR QUE DEVUELVE LA FUNCION
  async deleteById(id) {
    try {
      await this.connect();
      return await prodSchema.deleteOne({ _id: id });
    } catch (e) {
      console.log(e);
    } finally {
      this.disconnect();
    }
  }

  async disconnect() {
    return mongoose.disconnect();
  }
}

module.exports = ProductsDao;

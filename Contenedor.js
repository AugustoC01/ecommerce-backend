class Contenedor {
  constructor(table, options) {
    this.table = table;
    this.knex = require('knex')(options);
  }

  async createProductTable() {
    try {
      await this.knex.schema.createTable(this.table, (table) => {
        table.increments('id').primary(),
          table.string('title'),
          table.float('price'),
          table.integer('stock'),
          table.string('thumbnail'),
          table.string('description'),
          table.string('code'),
          table.timestamp('timestamp').defaultTo(this.knex.fn.now());
        console.log('Tabla productos creada');
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createMessageTable() {
    try {
      await this.knex.schema.createTable(this.table, (table) => {
        table.string('user'),
          table.string('msg'),
          table.timestamp('timestamp').defaultTo(this.knex.fn.now());
        console.log('Tabla mensajes creada');
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      return await this.knex.from(this.table).select('*');
    } catch (error) {
      console.log(error);
    }
  }

  async save(object) {
    try {
      await this.knex(this.table).insert(object);
      console.log('Objeto agregado');
    } catch (error) {
      console.log(error);
    }
  }

  async update(prodId, body) {
    try {
      await this.knex.from(this.table).where('id', prodId).update(body);
      console.log('Producto actualizado');
    } catch (error) {
      console.log(error);
    }
  }

  async getById(prodId) {
    try {
      return await this.knex
        .from(this.table)
        .select('*')
        .where('id', '=', prodId);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(prodId) {
    try {
      await this.knex.from(this.table).where('id', prodId).del();
      console.log('Producto eliminado');
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await this.knex.from(this.table).del();
      console.log('Todos los objetos eliminados');
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Contenedor;

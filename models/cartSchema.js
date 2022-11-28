const { Schema, model } = require('mongoose');
const { ProductSchema } = require('./prodSchema');

const CartSchema = new Schema({
  products: [ProductSchema],
  userId: { type: Schema.ObjectId, required: true },
  timestamp: { type: Date, required: true },
});

const Carts = model('Carts', CartSchema);
module.exports = Carts;

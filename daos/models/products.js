const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  title: { type: String, required: true, max: 50 },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true, max: 100 },
  timestamp: { type: Date, required: true },
  description: { type: String, required: true, max: 100 },
  code: { type: String, required: true, max: 10 },
  stock: { type: Number, required: true },
});

module.exports = model('products', ProductSchema);

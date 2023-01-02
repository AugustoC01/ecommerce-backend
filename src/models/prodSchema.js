const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  title: { type: String, required: true, max: 50 },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true, max: 100 },
  timestamp: { type: Date, required: true },
  description: { type: String, required: true, max: 100 },
  category: { type: String, required: true, max: 20 },
  code: { type: String, required: true, max: 10 },
  stock: { type: Number, required: true },
});

const Products = model('Products', ProductSchema);
module.exports = { Products, ProductSchema };

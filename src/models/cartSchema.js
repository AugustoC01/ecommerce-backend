const { Schema, model } = require("mongoose");
const { ProductSchema } = require("./prodSchema");

const CartSchema = new Schema({
  products: [ProductSchema],
  userId: { type: Schema.ObjectId, required: true },
  timestamp: { type: Date, required: true },
  address: { type: String, required: true },
});

const Carts = model("Carts", CartSchema);
module.exports = Carts;

/* const CartSchema = new Schema({
  products: [
    { quantity: { type: Number, default: 1 } },
    { prod: { type: ProductSchema } },
  ],
  userId: { type: Schema.ObjectId, required: true },
  timestamp: { type: Date, required: true },
}); */

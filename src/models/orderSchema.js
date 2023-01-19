const { Schema, model } = require("mongoose");
const { ProductSchema } = require("./prodSchema");

const OrderSchema = new Schema({
  items: [ProductSchema],
  orderNum: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  status: { type: String, default: "generada", required: true },
  email: { type: String, required: true },
});

const Orders = model("Orders", OrderSchema);
module.exports = Orders;

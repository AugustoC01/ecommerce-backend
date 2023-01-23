const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
  items: [
    {
      id: { type: String, required: true },
      price: { type: Number, required: true },
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  orderNum: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  status: { type: String, default: "generada", required: true },
  email: { type: String, required: true },
});

const Orders = model("Orders", OrderSchema);
module.exports = Orders;

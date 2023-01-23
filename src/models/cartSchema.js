const { Schema, model } = require("mongoose");

const CartSchema = new Schema({
  products: [
    {
      id: { type: String, required: true },
      price: { type: Number, required: true },
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  userId: { type: Schema.ObjectId, required: true },
  timestamp: { type: Date, required: true },
  address: { type: String, required: true },
});

const Carts = model("Carts", CartSchema);
module.exports = Carts;

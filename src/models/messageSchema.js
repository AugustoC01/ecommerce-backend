const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
  email: { type: String, required: true, max: 40 },
  type: { type: String, required: true, max: 10 },
  timestamp: { type: Date, required: true },
  msg: { type: String, required: true, max: 100 },
});

const Messages = model("Message", MessageSchema);
module.exports = Messages;

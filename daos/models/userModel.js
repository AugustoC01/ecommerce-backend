const { schema, model, Schema } = require('mongoose');

const UserSchema = new Schema({
  username: { type: String, required: true, max: 30 },
  password: { type: String, required: true, max: 20 },
});

module.exports = model('Users', UserSchema);

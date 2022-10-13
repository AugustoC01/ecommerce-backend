const mongoose = require('mongoose');

const dbURL =
  'mongodb+srv://admin:admin@cluster0.bjodeia.mongodb.net/?retryWrites=true&w=majority';
const connect = async () => {
  mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('connection', () => {
    console.log('conectado a mongo');
  });
};

module.exports = { connect };

const mongoose = require('mongoose');

/* const dbURL =
  'mongodb+srv://admin:admin@cluster0.bjodeia.mongodb.net/?retryWrites=true&w=majority';
const connect = async () => {
  mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;
  db.on('connection', () => {
    console.log('conectado a mongo');
  });
}; */

const dbURL =
  'mongodb+srv://admin:admin@cluster0.bjodeia.mongodb.net/?retryWrites=true&w=majority';
const db = mongoose
  .connect(dbURL)
  .then(() => console.log('Connected to DB'))
  .catch((e) => {
    console.error(e);
    throw 'can not connect to the db';
  });

module.exports = db;

const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const { MONGO_URL } = require('../../config');

const sessionConfig = session({
  store: MongoStore.create({
    mongoUrl: MONGO_URL,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }),
  secret: 'A secret',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 600000,
  },
});

module.exports = sessionConfig;

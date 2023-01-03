const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/userSchema');
const { createHash, isValidPass } = require('../helpers/brycpt');
const { logger, errorLogger } = require('../helpers/logger');
const { sendEmail } = require('../services/msgService');
const UsersDao = require('../daos/usersDao');

passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      await Users.findOne({ email: email }, (err, user) => {
        if (err) {
          errorLogger('Error en login : ', err);
          return done(err);
        }
        if (!user) {
          errorLogger('incorrect credentials');
          return done(null, false);
        }
        if (!isValidPass(user, password)) {
          errorLogger('incorrect credentials');
          return done(null, false);
        }
        return done(null, user);
      }).clone();
    }
  )
);

passport.use(
  'signup',
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      Users.findOne({ email: email }, (err, user) => {
        if (err) {
          errorLogger('Error en signup: ', err);
          return done(err);
        }
        if (user) {
          errorLogger('User already exists');
          return done(null, false);
        }
        //CHECKNUMBER VERIFICA QUE EMAIL, NAME Y ADDRESS NO SEAN CAMPOS QUE SOLO CONTIENEN NUMEROS
        const newUser = {
          email: checkNumber(req.body.email),
          password: createHash(password),
          name: checkNumber(req.body.name),
          address: checkNumber(req.body.address),
          age: parseInt(req.body.age),
          phone: parseInt(req.body.phone),
          avatar: req.file.filename,
          cartId: '',
        };
        try {
          UsersDao.validate(true, newUser);
        } catch (e) {
          errorLogger('Campos invalidos');
          return done(null, false);
        }
        Users.create(newUser, (err, user) => {
          if (err) {
            errorLogger('Error saving user: ', err);
            return done(err);
          }
          logger.info('User registration succesful');
          try {
            sendEmail('Nuevo registro', JSON.stringify(newUser));
          } catch (error) {
            errorLogger('Email no enviado');
          }
          return done(null, user);
        });
      }).clone();
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, done);
});

const checkNumber = (data) => {
  const number = parseInt(data);
  if (number) return number;
  return data;
};

module.exports = passport;

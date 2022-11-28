const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { createHash, isValidPass } = require('../helpers/brycpt');
const { logger } = require('../helpers/logger');
const Users = require('../models/userSchema');
const { sendEmail } = require('./twilio');

passport.use(
  'login',
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      await Users.findOne({ email: email }, (err, user) => {
        if (err) {
          logger.error('Error en login : ', err);
          return done(err);
        }
        if (!user) {
          logger.error('incorrect credentials');
          return done(null, false);
        }
        if (!isValidPass(user, password)) {
          logger.error('incorrect credentials');
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
      await Users.findOne({ email: email }, async (err, user) => {
        if (err) {
          logger.error('Error en signup: ', err);
          return done(err);
        }
        if (user) {
          logger.error('User already exists');
          return done(null, user);
        }
        const newUser = {
          email: email,
          password: createHash(password),
          name: req.body.name,
          address: req.body.address,
          age: req.body.age,
          phone: req.body.phone,
          avatar: req.file.filename,
          cartId: '',
        };
        Users.create(newUser, (err, user) => {
          if (err) {
            logger.error('Error saving user: ', err);
            return done(err);
          }
          logger.info('User registration succesful');
          sendEmail('Nuevo registro', JSON.stringify(newUser));
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

module.exports = passport;

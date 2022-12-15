const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/userSchema');
const { createHash, isValidPass } = require('../helpers/brycpt');
const { errorLogger } = require('../helpers/logger');
const { sendEmail } = require('../services/msgService');

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
      await Users.findOne({ email: email }, async (err, user) => {
        if (err) {
          errorLogger('Error en signup: ', err);
          return done(err);
        }
        if (user) {
          errorLogger('User already exists');
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
            errorLogger('Error saving user: ', err);
            return done(err);
          }
          logger.info('User registration succesful');
          try {
            sendEmail('Nuevo registro', JSON.stringify(newUser));
          } catch (error) {
            console.log('aca');
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

module.exports = passport;

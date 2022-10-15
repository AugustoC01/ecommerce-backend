const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../daos/models/userModel');
const { createHash, isValidPass } = require('../utils/bcrypt/brycpt');

passport.use(
  'login',
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        // console.log('Error en login: ', err);
        return done(err);
      }

      if (!user) {
        // console.log('User not found with username ', username);
        return done(null, false);
      }

      if (!isValidPass(user, password)) {
        // console.log('Invalid pass');
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

passport.use(
  'signup',
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        // console.log('Error en signup: ', err);
        return done(err);
      }

      if (user) {
        // console.log('User already exists');
        return done(null, user);
      }

      const newUser = {
        username: username,
        password: createHash(password),
      };
      User.create(newUser, (err, user) => {
        if (err) {
          // console.log('Error saving user: ', err);
          return done(error);
        }
        // console.log('User registration succesful');
        return done(null, user);
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

module.exports = passport;

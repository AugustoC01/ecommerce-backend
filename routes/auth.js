const express = require('express');
const authRouter = express.Router();
const {
  login,
  accessRedirect,
  signup,
  handleLogout,
  signupFail,
  loginFail,
} = require('../controllers/authController');
const passport = require('passport');

authRouter.get('/login', login);

authRouter.get('/signup', signup);

authRouter.get('/loginFail', loginFail);

authRouter.get('/signupFail', signupFail);

authRouter.get('/logout', handleLogout);

authRouter.post(
  '/signup',
  passport.authenticate('signup', { failureRedirect: '/signupFail' }),
  accessRedirect
);

authRouter.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/loginFail' }),
  accessRedirect
);

module.exports = authRouter;

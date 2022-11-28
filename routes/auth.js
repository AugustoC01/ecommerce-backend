const { Router } = require('express');
const authRouter = Router();
const {
  login,
  accessRedirect,
  signup,
  handleLogout,
  signupFail,
  loginFail,
  profileData,
} = require('../controllers/authController');
const upload = require('../middlewares/multer');
const passport = require('passport');

authRouter.get('/login', login);

authRouter.get('/signup', signup);

authRouter.get('/loginFail', loginFail);

authRouter.get('/signupFail', signupFail);

authRouter.get('/profile', profileData);

authRouter.post(
  '/signup',
  upload,
  passport.authenticate('signup', { failureRedirect: '/signupFail' }),
  accessRedirect
);

authRouter.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/loginFail' }),
  accessRedirect
);

authRouter.post('/logout', handleLogout);

module.exports = authRouter;

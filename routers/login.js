const express = require('express');
const loginRouter = express.Router();
const {
  login,
  handleLogin,
  handleLogout,
  register,
} = require('../controllers/loginController');

loginRouter.get('/login', login);

loginRouter.get('/register', register);

loginRouter.post('/login', handleLogin);

loginRouter.get('/logout', handleLogout);

module.exports = loginRouter;

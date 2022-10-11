const express = require('express');
const loginRouter = express.Router();
const {
  login,
  handleLogin,
  handleLogout,
} = require('../controllers/loginController');

loginRouter.get('/login', login);

loginRouter.post('/login', handleLogin);

loginRouter.get('/logout', handleLogout);

module.exports = loginRouter;

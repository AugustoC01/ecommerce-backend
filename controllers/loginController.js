let mail = '';

const isLogued = (req, res, next) => {
  if (req.session.mail) {
    next();
  } else {
    res.status(200).redirect('http://localhost:8080/logout');
  }
};

const handleLogout = (req, res, next) => {
  res.status(200).render('mainLogout', { mail: mail });
};

const login = (req, res) => {
  res.status(200).render('mainLogin', {
    submitAction: 'login',
    submitBtn: 'Ingresar',
    redirectAction: 'register',
    redirectBtn: 'Registrarse',
  });
};

const register = (req, res) => {
  res.status(200).render('mainLogin', {
    submitAction: 'register',
    submitBtn: 'Registrarse',
    redirectAction: 'login',
    redirectBtn: 'Ingresar',
  });
};

const handleLogin = (req, res) => {
  mail = req.body.mail;
  req.session.mail = mail;
  res.status(200).redirect('/api/products-test');
};

/* {errorAction:'login', errorMsg:'ERROR AL INGRESAR'}
{errorAction:'register', errorMsg:'ERROR AL REGISTARSE'} */

module.exports = { login, register, handleLogin, isLogued, handleLogout };

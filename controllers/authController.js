let name;

const login = (req, res) => {
  res.status(200).render('mainLogin', {
    title: 'Ingresar',
    submitAction: 'login',
    redirectAction: 'signup',
    redirectBtn: 'Registrarse',
  });
};

const signup = (req, res) => {
  res.status(200).render('mainLogin', {
    title: 'Registrarse',
    submitAction: 'signup',
    redirectAction: 'login',
    redirectBtn: 'Ingresar',
  });
};

const accessRedirect = (req, res) => {
  name = req.user.username;
  res.status(200).redirect('/api/products-test');
};

const handleLogout = (req, res, next) => {
  res.status(200).render('mainLogout', { name: name });
};

const loginFail = (req, res) => {
  res.status(200).render('mainLoginError', {
    errorAction: 'login',
    errorMsg: 'ERROR AL INGRESAR',
  });
};

const signupFail = (req, res) => {
  res.status(200).render('mainLoginError', {
    errorAction: 'signup',
    errorMsg: 'ERROR AL REGISTARSE',
  });
};

module.exports = {
  login,
  signup,
  accessRedirect,
  handleLogout,
  loginFail,
  signupFail,
};

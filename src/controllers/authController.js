const login = (req, res) => {
  res.status(200).render('mainLogin', { login: true });
};

const signup = (req, res) => {
  res.status(200).render('mainLogin');
};

const accessRedirect = (req, res) => {
  res.status(200).redirect('/productos');
};

const handleLogout = (req, res, next) => {
  const { name } = req.user;
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).render('mainLogout', { name });
  });
};

const loginFail = (req, res) => {
  res.status(200).render('mainError', {
    errorAction: 'login',
    errorMsg: 'ERROR AL INGRESAR',
  });
};

const signupFail = (req, res) => {
  res.status(200).render('mainError', {
    errorAction: 'signup',
    errorMsg: 'ERROR AL REGISTARSE',
  });
};

const profileData = (req, res) => {
  const { email, name, address, age, phone, avatar } = req.user;
  res.status(200).render('mainInfo', {
    logued: true,
    profile: true,
    email,
    name,
    address,
    age,
    phone,
    avatar,
  });
};

module.exports = {
  login,
  signup,
  accessRedirect,
  handleLogout,
  loginFail,
  signupFail,
  profileData,
};

let name = '';

const isLogued = (req, res, next) => {
  if (req.session.name) {
    next();
  } else {
    res.status(200).redirect('http://localhost:8080/logout');
  }
};

const handleLogout = (req, res, next) => {
  res.status(200).render('mainLogout', { name: name });
};

const login = (req, res) => {
  res.status(200).render('mainLogin');
};

const handleLogin = (req, res) => {
  name = req.body.name;
  req.session.name = name;
  res.status(200).redirect('/api/products-test');
};

module.exports = { login, handleLogin, isLogued, handleLogout };

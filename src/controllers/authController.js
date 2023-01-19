const login = (req, res) => {
  res.status(200).render("mainLogin", { login: true, notLogued: true });
};

const signup = (req, res) => {
  res.status(200).render("mainLogin", { notLogued: true });
};

const accessRedirect = (req, res) => {
  res.status(200).redirect("/productos");
};

const handleLogout = (req, res, next) => {
  const { name } = req.user;
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).render("mainLogout", { name });
  });
};

const loginFail = (req, res) => {
  res.status(200).render("mainNotification", {
    action: "login",
    msg: "ERROR AL INGRESAR",
    error: true,
    notLogued: true,
  });
};

const signupFail = (req, res) => {
  res.status(200).render("mainNotification", {
    action: "signup",
    msg: "ERROR AL REGISTARSE",
    error: true,
    notLogued: true,
  });
};

const profileData = (req, res) => {
  const { email, name, address, age, phone, avatar } = req.user;
  res.status(200).render("mainInfo", {
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

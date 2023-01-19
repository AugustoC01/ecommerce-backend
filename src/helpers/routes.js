const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(200).redirect("/login");
};

module.exports = { checkAuth };

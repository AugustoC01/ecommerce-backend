const notImplemented = (req, res) => {
  res
    .status(404)
    .json({ error: -2, description: `Ruta ${req.path} no implementada` });
};

module.exports = notImplemented;

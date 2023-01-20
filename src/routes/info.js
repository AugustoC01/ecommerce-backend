const { Router } = require("express");
const infoRouter = Router();
const { showInfo } = require("../controllers/infoController");

infoRouter.get("/", showInfo);

module.exports = infoRouter;

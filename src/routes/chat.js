const { Router } = require("express");
const chatRouter = Router();
const { chat, getHistory } = require("../controllers/chatController");

chatRouter.get("/", chat);
chatRouter.get("/:email", getHistory);

module.exports = chatRouter;

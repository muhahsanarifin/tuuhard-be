const express = require("express");
const authRouter = express.Router();
const authControllers = require("../controllers/auth");

authRouter.post("/register", authControllers.register);

module.exports = authRouter;

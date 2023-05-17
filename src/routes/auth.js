const express = require("express");
const authRouter = express.Router();
const authControllers = require("../controllers/auth");

const checkLogin = require("../middlewares/checkLogin");

authRouter.post("/register", authControllers.register);

authRouter.get("/confirm", authControllers.confirm);

authRouter.post("/login", authControllers.login);

authRouter.delete("/logout", checkLogin, authControllers.logout);

module.exports = authRouter;

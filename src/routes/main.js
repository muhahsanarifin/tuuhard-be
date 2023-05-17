const express = require("express");

const authRouter = require("./auth");

const passwordRouter = require("./passwords");

const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/password", passwordRouter);

module.exports = mainRouter;

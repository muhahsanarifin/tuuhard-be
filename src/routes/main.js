const express = require("express");

const authRouter = require("./auth");
const passwordRouter = require("./passwords");
const productRouter = require("./products");
const categoryRouter = require("./categories");

const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/password", passwordRouter);
mainRouter.use("/products", productRouter);
mainRouter.use("/categories", categoryRouter);

module.exports = mainRouter;

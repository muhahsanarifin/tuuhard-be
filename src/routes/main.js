const express = require("express");

const authRouter = require("./auth");
const passwordRouter = require("./passwords");
const productRouter = require("./products");
const categoryRouter = require("./categories");
const userRouter = require("./users");
const orderRouter = require("./orders");
const transactionRouter = require("./transactions");
const promoRouter = require("./promos");

const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/password", passwordRouter);
mainRouter.use("/products", productRouter);
mainRouter.use("/categories", categoryRouter);
mainRouter.use("/orders", orderRouter);
mainRouter.use("/transactions", transactionRouter);
mainRouter.use("/promo", promoRouter);

module.exports = mainRouter;

const orderRouter = require("express").Router();

const orderControllers = require("../controllers/orders");
const checkoutControllers = require("../controllers/checkout");
const checkLogin = require("../middlewares/checkLogin");

orderRouter.post("/create", checkLogin, orderControllers.create);
orderRouter.post("/checkout", checkLogin, checkoutControllers.create);

module.exports = orderRouter;

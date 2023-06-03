const orderRouter = require("express").Router();

const orderControllers = require("../controllers/orders");
const checkoutControllers = require("../controllers/checkout");
const checkLogin = require("../middlewares/checkLogin");
const checkAllowedRoles = require("../middlewares/allowedRoles");

orderRouter.post(
  "/create",
  checkLogin,
  checkAllowedRoles(["admin", "developer", "staff", "customer"]),
  orderControllers.create
);
orderRouter.post(
  "/checkout",
  checkLogin,
  checkAllowedRoles(["admin", "developer", "staff", "customer"]),
  checkoutControllers.create
);

module.exports = orderRouter;

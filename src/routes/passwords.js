const passwordRouter = require("express").Router();
const passwordControllers = require("../controllers/passwords");
const checkLogin = require("../middlewares/checkLogin");
const checkAllowedRoles = require("../middlewares/allowedRoles");

passwordRouter.post("/forgot", passwordControllers.send);
passwordRouter.post("/reset/:token", passwordControllers.reset);
passwordRouter.patch(
  "/change",
  checkLogin,
  checkAllowedRoles(["admin", "developer", "staff", "customer"]),
  passwordControllers.change
);

module.exports = passwordRouter;

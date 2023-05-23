const passwordRouter = require("express").Router();
const passwordControllers = require("../controllers/passwords");
const checkLogin = require("../middlewares/checkLogin");

passwordRouter.post("/forgot", passwordControllers.send);
passwordRouter.post("/reset/:token", passwordControllers.reset);
passwordRouter.patch("/change", checkLogin, passwordControllers.change);

module.exports = passwordRouter;

const categoryRouter = require("express").Router();
const categoryControllers = require("../controllers/categories");

const checkLogin = require("../middlewares/checkLogin");
const allowedRoles = require("../middlewares/allowedRoles");

categoryRouter.get("/", checkLogin, categoryControllers.retrivesCategories);
categoryRouter.post(
  "/create",
  checkLogin,
  allowedRoles(["admin", "developer"]),
  categoryControllers.create
);
categoryRouter.patch(
  "/edit/:categoryId",
  checkLogin,
  allowedRoles(["admin", "developer"]),
  categoryControllers.edit
);
categoryRouter.delete(
  "/delete/:categoryId",
  allowedRoles(["admin", "developer"]),
  checkLogin,
  categoryControllers.delete
);

module.exports = categoryRouter;

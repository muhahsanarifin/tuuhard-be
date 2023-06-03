const promoRoute = require("express").Router();

const promoControllers = require("../controllers/promos");
const checkLogin = require("../middlewares/checkLogin");
const checkAllowedRoles = require("../middlewares/allowedRoles");

promoRoute.get(
  "/productId",
  checkLogin,
  checkAllowedRoles(["admin", "developer", "staff", "customer"]),
  promoControllers.retrivePromoByIdProduct
);
promoRoute.post(
  "/create",
  checkLogin,
  checkAllowedRoles(["admin", "developer"]),
  promoControllers.create
);
promoRoute.patch(
  "/edit",
  checkLogin,
  checkAllowedRoles(["admin", "developer"]),
  promoControllers.edit
);
promoRoute.delete(
  "/delete",
  checkLogin,
  checkAllowedRoles(["admin", "developer"]),
  promoControllers.delete
);

module.exports = promoRoute;

const authRouter = require("express").Router();
const productControllers = require("../controllers/products");

const checkLogin = require("../middlewares/checkLogin");
const {
  singleMemoryUpload,
  errorHandler,
} = require("../middlewares/memoryUpload");
const uploads = require("../middlewares/uploads");
const checkAllowedRoles = require("../middlewares/allowedRoles");

authRouter.get(
  "/",
  checkLogin,
  checkAllowedRoles(["admin", "developer", "staff"]),
  productControllers.retriveProducts
);
authRouter.get(
  "/:productId",
  checkLogin,
  checkAllowedRoles(["admin", "developer", "staff"]),
  productControllers.retriveProduct
);
authRouter.post(
  "/create",
  checkLogin,
  checkAllowedRoles(["admin", "developer", "staff"]),
  (req, res, next) =>
    singleMemoryUpload("image")(req, res, (err) => {
      errorHandler(err, res, next);
    }),
  (req, res, next) =>
    uploads(`PT-${req.body.product}`, "tuuhard-products", req, res, next),
  productControllers.create
);
authRouter.patch(
  "/edit/:productId",
  checkLogin,
  checkAllowedRoles(["admin", "developer", "staff"]),
  (req, res, next) =>
    singleMemoryUpload("image")(req, res, (err) => {
      errorHandler(err, res, next);
    }),
  (req, res, next) =>
    uploads(`PT-${req.body.product}`, "tuuhard-products", req, res, next),
  productControllers.edit
);
authRouter.delete(
  "/delete/productId",
  checkLogin,
  checkAllowedRoles(["admin", "developer"]),
  productControllers.delete
);

module.exports = authRouter;

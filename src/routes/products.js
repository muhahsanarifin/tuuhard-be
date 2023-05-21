const express = require("express");
const authRouter = express.Router();
const productControllers = require("../controllers/products");

const checkLogin = require("../middlewares/checkLogin");
const {
  singleMemoryUpload,
  errorHandler,
} = require("../middlewares/memoryUpload");
const uploads = require("../middlewares/uploads");
const checkAllowedRoles = require("../middlewares/allowedRoles");

authRouter.get("/", checkLogin, productControllers.retriveProducts);
authRouter.get("/:idProduct", checkLogin, productControllers.retriveProduct);
authRouter.post(
  "/create",
  checkLogin,
  checkAllowedRoles(["admin", "developer"]),
  (req, res, next) =>
    singleMemoryUpload("image")(req, res, (err) => {
      errorHandler(err, res, next);
    }),
  (req, res, next) =>
    uploads(`PT-${req.body.product}`, "tuuhard-products", req, res, next),
  productControllers.create
);
authRouter.patch(
  "/edit/:idProduct",
  checkLogin,
  checkAllowedRoles(["admin", "developer"]),
  (req, res, next) =>
    singleMemoryUpload("image")(req, res, (err) => {
      errorHandler(err, res, next);
    }),
  (req, res, next) =>
    uploads(`PT-${req.body.product}`, "tuuhard-products", req, res, next),
  productControllers.edit
);
authRouter.delete("/delete/idProduct", checkLogin, productControllers.delete);

module.exports = authRouter;

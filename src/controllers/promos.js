const promoModules = require("../models/promos");

module.exports = {
  create: async (req, res) => {
    try {
      const response = await promoModules.create(req.body);
      res.status(201).json({
        data: response.rows,
        msg: "Success create promo",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  },
  retrivePromoByIdProduct: async (req, res) => {
    try {
      const response = await promoModules.retrivePromoByIdProduct(req.params);
      res.status(200).json({
        data: response.rows,
        msg: "Success get promo data",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  },
  edit: async (req, res) => {
    try {
      const response = await promoModules.edit(req.body, req.params);
      res.status(201).json({
        data: response.rows,
        msg: "Success edit promo data",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const response = await promoModules.delete(req.params);
      res.status(200).json({
        data: response.rows,
        msg: "Success delete product",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  },
};

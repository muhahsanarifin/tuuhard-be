const productModels = require("../models/products");

module.exports = {
  retriveProducts: async (req, res) => {
    try {
      const response = await productModels.retriveProducts();
      res.status(200).json({
        data: response.rows,
        msg: "Success get product data",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  },
  retriveProduct: async (req, res) => {
    try {
      const response = await productModels.retriveProduct(req.params);

      res.status(200).json({
        data: response.rows,
        msg: "Success get product data",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  },
  create: async (req, res) => {
    try {
      const existProduct = await productModels.retriveProductByName(req.body.name);

      if (existProduct.rows.length > 0) {
        return res.status(400).json({
          msg: "Duplicate product",
        });
      }

      const response = await productModels.create(req.body, req.file);
      res.status(201).json({
        data: response.rows,
        msg: "Success create product",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  },
  edit: async (req, res) => {
    try {
      const retriveExistProduct = await productModels.retriveProduct(
        req.params
      );

      const response = await productModels.edit(
        req.body,
        req.params,
        req.file,
        retriveExistProduct.rows[0]
      );
      res.status(201).json({
        data: response.rows,
        msg: "Success update product",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  },
  delete: async (req, res) => {
    try {
      await productModels.delete(req.params);
      res.status(200).json({
        msg: "Success delete product",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  },
};

const categoryModels = require("../models/categories");
const productModels = require("../models/products");

module.exports = {
  retrivesCategories: async (req, res) => {
    try {
      const response = await categoryModels.retriveCategories();
      res.status(200).json({
        data: response.rows,
        msg: "Success get category data",
      });
    } catch (error) {
      res.status.json(500).json({
        msg: "Internal server error,",
      });
    }
  },
  create: async (req, res) => {
    try {
      const existCategory = await categoryModels.retriveCategoryByName(
        req.body.category
      );
      if (existCategory.rows.length > 0) {
        return res.status(400).json({
          msg: "Duplicate category",
        });
      }
      const response = await categoryModels.create(req.body);
      res.status(201).json({
        data: response.rows,
        msg: "Success create category",
      });
    } catch (error) {
      res.status.json(500).json({
        msg: "Internal server error,",
      });
    }
  },
  delete: async (req, res) => {
    try {
      if (req.params.categoryId) {
        await productModels.updatePCByCategoryId(req.params.categoryId);
      }

      const response = await categoryModels.delete(req.params.categoryId);
      res.status(200).json({
        data: response.rows,
        msg: "Delete category successfully",
      });
    } catch (error) {
      res.status.json(500).json({
        msg: "Internal server error,",
      });
    }
  },
  edit: async (req, res) => {
    try {
      const retriveExistCategory = await categoryModels.edit(
        req.params.categoryId
      );

      const respose = await categoryModels.edit(
        req.body,
        req.params.categoryId,
        retriveExistCategory.rows[0]
      );
      res.status(201).json({
        data: respose.rows,
        msg: "Success update category",
      });
    } catch (error) {
      res.status.json(500).json({
        msg: "Internal server error,",
      });
    }
  },
};

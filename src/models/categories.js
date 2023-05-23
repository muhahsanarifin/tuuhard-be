const db = require("../configs/postgre");

module.exports = {
  retriveCategories: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM categories";

      db.query(query, (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  retriveCategoryById: (categoryId) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM categories WHERE id = $1";
      db.query(query, [categoryId], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  retriveCategoryByName: (name) => {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT * categories WHERE category ILIKE " +
        `'%${name}%'`;

      db.query(query, (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  create: (body) => {
    const { category } = body;
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO categories (category, created_at) VALUES ($1, $2) RETURNING *";
      db.query(query, [category, Date.now()], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  delete: (categoryId) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM categories WHERE id = $1 RETURNING *";
      db.query(query, [categoryId], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  edit: (body, categoryId, previousData) => {
    let { category } = body;
    return new Promise((resolve, reject) => {
      if (category === 0) {
        category = previousData.category;
      } else {
        category;
      }

      const query =
        "UPDATE categories set category = $2, updated_at = $3 WHERE id = $1 RETURNING category, updated_at";
      db.query(query, [categoryId, category, Date.now()], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
};

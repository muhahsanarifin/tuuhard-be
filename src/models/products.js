const db = require("../configs/postgre");

module.exports = {
  retriveProducts: () => {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT p.id, p.product, p.image, p.price, c.category, p.stocks, p.created_at, p.updated_at FROM products p JOIN categories c ON p.category_id = c.id";
      db.query(query, (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  retriveProduct: (productId) => {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT p.id, p.product, p.image, p.price, c.category, p.stocks, p.created_at, p.updated_at FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = $1";
      db.query(query, [productId], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  // Retrive product by product name
  retriveProductByName: (name) => {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT p.id, p.product, p.image, p.price, c.category, p.stocks ,p.created_at, p.updated_at FROM products p JOIN categories c ON p.category_id = c.id WHERE p.product ILIKE " +
        `'%${name}%'`;

      db.query(query, (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  createProduct: (body, file) => {
    return new Promise((resolve, reject) => {
      let { product, image, price, category_id, stocks } = body,
        sliceUrlImage;

      if (file) {
        image = file.secure_url;

        sliceUrlImage = image.slice(image.indexOf("image"));
      }

      const query =
        "INSERT INTO products (product, image, price, category_id, stocks, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
      db.query(
        query,
        [
          product,
          sliceUrlImage,
          Number(price),
          category_id,
          stocks,
          Date.now(),
        ],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  },
  deleteProduct: (productId) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM products WHERE id = $1";
      db.query(query, [productId], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  editProduct: (body, productId, file) => {
    let { product, category_id, image, price, stocks } = body,
      sliceUrlImage;

    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM products WHERE id = $1";
      db.query(query, [productId], (error, previousData) => {
        if (error) {
          return reject(error);
        }
        if (product.length === 0) {
          product = previousData.rows[0].product;
        } else {
          product;
        }
        if (category_id.length === 0) {
          category_id = previousData.rows[0].category_id;
        } else {
          category_id;
        }
        if (price.length === 0) {
          price = previousData.rows[0].price;
        } else {
          price;
        }
        if (stocks.length === 0) {
          stocks = previousData.rows[0].stocks;
        } else {
          stocks;
        }

        if (file) {
          image = file.secure_url;

          sliceUrlImage = image.slice(image.indexOf("image"));
        }

        const query =
          "UPDATE products SET product = $2, category_id = $3, image = $4, price = $5, stocks = $6, updated_at = $7 WHERE id = $1 RETURNING *";

        const values = [
          productId,
          product,
          category_id,
          sliceUrlImage,
          price,
          stocks,
          Date.now(),
        ];

        db.query(query, values, (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        });
      });
    });
  },
  // C = Category, P = Product
  updatePCByCategoryId: (categoryId) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE products SET category = $2 WHERE category_id = $1";
      db.query(query, [categoryId, categoryId], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
};

const db = require("../configs/postgre");

module.exports = {
  retriveProducts: () => {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT p.id, p.product, p.image, p.price, c.category, p.created_at, p.updated_at FROM products p JOIN categories c ON p.category_id = c.id";
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
        "SELECT p.id, p.product, p.image, p.price, c.category, p.created_at, p.updated_at FROM products p JOIN categories c ON p.category_id = c.id WHERE p.id = $1";
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
        "SELECT p.id, p.product, p.image, p.price, c.category, p.created_at, p.updated_at FROM products p JOIN categories c ON p.category_id = c.id WHERE p.product ILIKE " +
        `'%${name}%'`;

      db.query(query, (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  create: (body, file) => {
    return new Promise((resolve, reject) => {
      let { product, image, price, category_id } = body;

      image = file.secure_url;

      image.slice(image.indexOf("image"));

      const sliceUrlImage = image.slice(image.indexOf("image"));

      const query =
        "INSERT INTO products (product, image, price, category_id, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *";
      db.query(
        query,
        [product, sliceUrlImage, Number(price), category_id, Date.now()],
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
  editProduct: (body, productId, file, previousData) => {
    let { product, image, price } = body;
    let sliceUrlImage;
    return new Promise((resolve, reject) => {
      if (product.length === 0) {
        product = previousData.product;
      } else {
        product;
      }
      if (image.length === 0) {
        image = previousData.product;
        sliceUrlImage = image;
      } else {
        image = file.secure_url;

        image.slice(image.indexOf("image"));

        sliceUrlImage = image.slice(image.indexOf("image"));
      }
      if (price.length === 0) {
        price = previousData.price;
      } else {
        price;
      }

      const query =
        "UPDATE products SET product = $2, image = $3, price = $4, updated_at = $5 WHERE id = $1";
      db.query(
        query,
        [productId, product, sliceUrlImage, price, Date.now()],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  },
  // C = Category, P = Prodcut
  updatePCByCategoryId: (categoryId) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE products SET category = $2 WHERE category_id = $1";
      db.query(
        query,
        [Number(categoryId), Number(categoryId)],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  },
};

const db = require("../configs/postgre");

module.exports = {
  retriveProducts: () => {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT p.product, p.image, p.price, p.created_at, p.updated_at from products p";
      db.query(query, (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  retriveProduct: (idProduct) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM profucts where id = $1";
      db.query(query, [idProduct], (error, result) => {
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
      const query = "SELECT * FROM products WHERE product = $1";
      db.query(query, [name], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  create: (body, file) => {
    return new Promise((resolve, reject) => {
      let { product, image, price } = body;

      image = file.secure_url;

      image.slice(image.indexOf("image"));

      const sliceUrlImage = image.slice(image.indexOf("image"));

      const query =
        "INSERT INTO products (product, image, price, created_at) VALUES ($1, $2, $3, $4) RETURNING *";
      db.query(
        query,
        [product, sliceUrlImage, Number(price), new Date()],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  },
  deleteProduct: (idProduct) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM products WHERE id = $1";
      db.query(query, [idProduct], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  editProduct: (body, idProduct, file, previousData) => {
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
        [idProduct, product, sliceUrlImage, price, new Date()],
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

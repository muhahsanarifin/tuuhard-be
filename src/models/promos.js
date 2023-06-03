const db = require("../configs/postgre");

module.exports = {
  create: (body) => {
    const { promo, product_id, discount, valid, expiry, created_at } = body;
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO promos (promo, product_id, discount, valid, expiry, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";

      const values = [promo, product_id, discount, valid, expiry, created_at];

      db.query(query, values, (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  retrivePromoByIdProduct: (productId) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM promos WHERE product_id = $1";
      db.query(query, [productId], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  edit: (body, promoId) => {
    const { promo, discount, valid, expiry, product_id } = body;
    return new Promise((resolve, reject) => {
      const query =
        "UPDATE promos SET promo = $2, discount = $3, product_id = $4, valid = $5, expiry = $6, updated_at = $7 WHERE id = $1 RETURNING *";

      const values = [promoId, promo, discount, valid, expiry, product_id];
      db.query(query, values, (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  delete: (idPromo) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM promos WHERE id = $1 RETURNING *";
      db.query(query, [idPromo], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
};

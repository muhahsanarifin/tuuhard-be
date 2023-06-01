const bcrypt = require("bcrypt");

module.exports = {
  create: (user, customer, body, purchase, client) => {
    const { tax } = body;

    return new Promise((resolve, reject) => {
      // T = Tuuhard C = Customer N = No, O = Order
      bcrypt.hash(`${customer.id}`, 6, (error, noOrderHash) => {
        if (error) {
          return reject(error);
        }
        const query =
          "INSERT INTO orders (user_id, customer_id, no_order, status_order, quantity_total, subtotal, tax, total, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
        const values = [
          user.id,
          customer.id,
          "TCNO-" + noOrderHash,
          2,
          purchase.quantity_total,
          purchase.subtotal,
          tax,
          purchase.total,
          Date.now(),
        ];
        client.query(query, values, (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        });
      });
    });
  },
  updateStatus: (order, client) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE orders SET status_order = $2 WHERE order_id = $1";
      client.query(query, [1, order.id], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
};
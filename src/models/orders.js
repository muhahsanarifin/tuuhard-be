const random = require("../helpers//generateRandom");

module.exports = {
  create: (user, customer, body, purchase, client) => {
    const { tax } = body;

    return new Promise((resolve, reject) => {
      // T = Tuuhard C = Customer N = No, O = Order
      const query =
        "INSERT INTO orders (user_id, customer_id, no_order, status_order, quantity_total, subtotal, tax, total, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
      const values = [
        user.id,
        customer.id,
        random("TCNO-", customer.id),
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
  orderRecently: (body, client) => {
    // Develepor is able to use customer_id as body to get spesific rows
    const { order_id } = body;
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM orders WHERE id = $1";
      client.query(query, [order_id], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
};

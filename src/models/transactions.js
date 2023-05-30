module.exports = {
  create: (user, body, client) => {
    const { customer_id, payment_method } = body;

    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO transactions (user_id, customer_id, payment_method, status_transaction, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *";

      const values = [user.id, customer_id, payment_method, 2, Date.now()];

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
      const query =
        "UPDATE transactions SET status_transaction = $2, updated_at = $3 WHERE order_id = $1 RETURNING *";

      const values = [order.id, 1, Date.now()];

      client.query(query, values, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  },
};

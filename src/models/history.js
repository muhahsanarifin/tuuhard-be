module.exports = {
  create: (user, customer, order, body, client) => {
    const { histories } = body; // The request body contains an array of histories

    return new Promise((resolve, reject) => {
      let query =
        "INSERT INTO histories (user_id, customer_id, order_id, product, image, price, quantity, created_at) VALUES ";

      let values = [];

      histories.forEach((history, idx) => {
        const { product, image, price, quantity } = history;

        if (values.length) query += ", ";
        query += `($${1 + 8 * idx}, $${2 + 8 * idx}, $${3 + 8 * idx}, $${
          4 + 8 * idx
        }, $${5 + 8 * idx}, $${6 + 8 * idx}, $${7 + 8 * idx}, $${8 + 8 * idx})`;

        values.push(
          user.id,
          customer.id,
          order.id,
          product,
          image,
          price,
          quantity,
          Date.now()
        );
      });
      client.query(query + " RETURNING id, product, image, price, quantity, created_at", values, (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result);
      });
    });
  },
  updateTransactionId: (order, transaction, client) => {
    return new Promise((resolve, reject) => {
      const query =
        "UPDATE histories SET transaction_id = $2, updated_t = $3 WHERE order_id = $1 RETURNING *";
      client.query(
        query,
        [order.id, transaction.id, Date.now()],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        }
      );
    });
  },
  retriveOrderProducts: (order, client) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM histories WHERE order_id = $1";
      client.query(query, [order.id], (error, result) => {
        // console.log("Result: ", result);
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
};

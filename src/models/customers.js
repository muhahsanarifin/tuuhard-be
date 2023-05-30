module.exports = {
  create: (body, client) => {
    const { customer, email, first_name, last_name, no_telp } = body;
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO customers (customer, email, first_name, last_name, no_telp, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
      const values = [
        customer,
        email,
        first_name,
        last_name,
        no_telp,
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
};

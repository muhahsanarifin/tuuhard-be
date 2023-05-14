const db = require("../configs/postgre");
const bcrypt = require("bcrypt");

module.exports = {
  register: (body) => {
    const { email, password } = body;

    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
          return reject(error);
        }

        const query =
          "INSERT INTO users (email, password, role_id, created_at) VALUES ($1, $2, $3, $4) RETURNING *";

        db.query(query, [email, hash, "3", new Date()], (error, result) => {
          if (error) {
            return reject(error);
          }

          const query =
            "INSERT INTO accounts (user_id, status_account, created_at) VALUES ($1, $2, $3) RETURNING *";

          db.query(
            query,
            [result.rows[0].id, "inactive", new Date()],
            (error, result) => {
              if (error) {
                return reject(error);
              }

              const query =
                "INSERT INTO profiles (user_id, created_at) VALUES ($1, $2) RETURNING *";

              db.query(
                query,
                [result.rows[0].user_id, new Date()],
                (error, result) => {
                  if (error) {
                    return reject(error);
                  }

                  const data = {
                    email: email,
                  };
                  console.log(result);
                  resolve(data);
                }
              );
            }
          );
        });
      });
    });
  },
};

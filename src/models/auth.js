const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../configs/postgre");
const verify = require("../helpers/jsonwebtoken");
module.exports = {
  login: (data) => {
    const { id, email, role } = data.rows[0];
    return new Promise((resolve, reject) => {
      const payload = {
        id: id,
        email: email,
        role: role,
      };

      const jwtOption = {
        expiresIn: "24h",
      };

      jwt.sign(payload, process.env.SECRET_KEY, jwtOption, (error, token) => {
        if (error) {
          return reject(error);
        }

        resolve(token);
      });
    });
  },
  register: (body) => {
    const { email, password } = body;

    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
          return reject(error);
        }

        const query =
          "INSERT INTO users (email, password, role_id, created_at) VALUES ($1, $2, $3, $4) RETURNING *";

        db.query(query, [email, hash, "3", Date.now()], (error, userResult) => {
          if (error) {
            return reject(error);
          }

          const query =
            "INSERT INTO accounts (user_id, status_account, created_at) VALUES ($1, $2, $3) RETURNING *";

          db.query(
            query,
            [userResult.rows[0].id, "inactive", Date.now()],
            (error, accountResult) => {
              if (error) {
                return reject(error);
              }

              const query =
                "INSERT INTO profiles (user_id, created_at) VALUES ($1, $2) RETURNING *";

              db.query(
                query,
                [accountResult.rows[0].user_id, Date.now()],
                (error, profileResult) => {
                  if (error) {
                    return reject(error);
                  }

                  const data = {
                    id: profileResult.rows[0].user_id,
                    email: email,
                    role: userResult.rows[0].role_id,
                  };
                  resolve(data);
                }
              );
            }
          );
        });
      });
    });
  },
  confirm: (token) => {
    return new Promise((resolve, reject) => {
      // Promise.prototype.then()
      verify.decoded(token, process.env.SECRET_KEY).then((result) => {
        const query =
          "UPDATE accounts SET status_account = $2, updated_at = $3 WHERE user_id = $1 RETURNING status_account";

        db.query(query, [result.id, "active", Date.now()], (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        });
      });
    });
  },
  logout: (payload) => {
    const { id } = payload;

    return new Promise((resolve, reject) => {
      const query =
        "UPDATE users SET last_login = $2 WHERE id = $1 RETURNING email, last_login";
      db.query(query, [id, Date.now()], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
};

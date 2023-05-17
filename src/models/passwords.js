const bcrypt = require("bcrypt");
const db = require("../configs/postgre");

module.exports = {
  send: (email) => {
    return new Promise((resolve, reject) => {
      // r = reset, p = password, b = by, at = a
      bcrypt.hash(
        "rpb" + email + "a" + new Date().toString(),
        10,
        (error, hash) => {
          if (error) {
            return reject(error);
          }
          return resolve(hash);
        }
      );
    });
  },
  reset: (body, email) => {
    const { password } = body;

    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (error, hash) => {
        if (error) {
          return reject(error);
        }
        const query =
          "UPDATE users SET password = $2, updated_at = $3 WHERE email = $1 RETURNING email";
        db.query(query, [email, hash, new Date()], (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        });
      });
    });
  },
  confirm: () => {
    return new Promise((resolve, reject) => {
      resolve("Success");
      reject("Error");
    });
  },
  change: (newPassword, email) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(newPassword, 10, (error, hash) => {
        if (error) {
          return reject(error);
        }
        const query =
          "UPDATE users SET password = $2, updated_at = $3 WHERE email = $1 RETURNING email";
        db.query(query, [email, hash, new Date()], (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        });
      });
    });
  },
};

const db = require("../configs/postgre");

module.exports = {
  retriveUserByEmail: (body) => {
    const { email } = body;
    return new Promise((resolve, reject) => {
      const query =
        "select u.id, u.email, u.password, r.role, u.last_login, u.created_at, u.updated_at from users u join roles r on u.role_id = r.id where u.email = $1";

      db.query(query, [email], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  retriveAccount: (body) => {
    const { email } = body;
    return new Promise((resolve, reject) => {
      const query =
        "select u.id,u.email, r.role, status_account from users u join accounts a on u.id = a.user_id join roles r on u.role_id = r.id where u.email = $1";

      db.query(query, [email], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
};

const db = require("../configs/postgre");

module.exports = {
  retriveUserByEmail: (body) => {
    const { email } = body;
    return new Promise((resolve, rejected) => {
      const query =
        "select u.id, u.email, u.password, r.role, u.last_login, u.created_at, u.updated_at from users u join roles r on u.role_id = r.id where u.email = $1";

      db.query(query, [email], (error, result) => {
        if (error) {
          rejected(error);
        }
        return resolve(result);
      });
    });
  },
};

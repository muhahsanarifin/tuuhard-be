const db = require("../configs/postgre");

module.exports = {
  retriveUserByEmail: (body) => {
    const { email } = body;
    return new Promise((resolve, reject) => {
      const query =
        "SELECT u.id, u.email, u.password, r.role, u.last_login, u.created_at, u.updated_at FROM users u JOIN roles r ON u.role_id = r.id WHERE u.email = $1";

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
        "SELECT u.id,u.email, r.role, status_account FROM users u JOIN accounts a ON u.id = a.user_id JOIN roles r ON u.role_id = r.id WHERE u.email = $1";

      db.query(query, [email], (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  retriveProfiles: () => {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT p.user_id, p.first_name, p.last_name, p.gender, p.birth, p.no_telp, p.created_at, p.updated_at FROM profiles p";
      db.query(query, (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  },
  retriveProfile: (payload) => {
    const { id } = payload;
    return new Promise((resolve, reject) => {
      const query =
        "SELECT p.user_id, p.first_name, p.last_name, p.gender, p.birth, p.no_telp, p.created_at, p.updated_at FROM profiles p WHERE p.user_id = $1";
      db.query(query, [id], (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  },
};

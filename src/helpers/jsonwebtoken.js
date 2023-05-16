const jwt = require("jsonwebtoken");

// Verify a token symmetric
module.exports = {
  decoded: (token, secretKey) => {
    // Promise() constructor
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
          return reject(error);
        }
        return resolve(decoded);
      });
    });
  },
};

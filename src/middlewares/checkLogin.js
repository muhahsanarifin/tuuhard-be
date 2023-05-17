const jwt = require("jsonwebtoken");
const redis = require("../helpers/redis");

const checkLogin = async (req, res, next) => {
  const bearerToken = req.header("Authorization");
  if (!bearerToken) {
    return res.status(403).json({
      msg: "You have to login",
    });
  }

  const token = bearerToken.split(" ")[1];

  const checkToken = await redis.get(`tlu-${token}` || `tru-${token}`);
  if (!checkToken) {
    return res.status(403).json({
      msg: "You have to login first!",
    });
  }

  jwt.verify(
    token,
    process.env.SECRET_KEY,
    { issuer: process.env.ISSUER },
    (error, decode) => {
      if (error && error.name) {
        return res.status(403).json({
          msg: error.message,
        });
      }

      if (error) {
        return res.status(500).json({
          msg: error.message,
        });
      }

      req.userPayload = decode;

      next();
    }
  );
};

module.exports = checkLogin;

const bcrypt = require("bcrypt");
const redis = require("../helpers/redis");
const nodemailer = require("../helpers/nodemailer");
const passwordModels = require("../models/passwords");
const userModels = require("../models/users");

module.exports = {
  change: async (req, res) => {
    try {

      const { password, newPassword } = req.body;

      const result = await userModels.retriveUserByEmail(req.userPayload);
      

      const match = await bcrypt.compare(password, result.rows[0].password);

      if (!match) {
        return res.status(401).json({
          msg: "Wrong password",
        });
      }

      const response = await passwordModels.change(
        newPassword,
        result.rows[0].email
      );

      res.status(201).json({
        data: response.email,
        msg: "Password has been change successfully",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  },
  reset: async (req, res) => {
    try {
      const { token } = req.params;

      const result = await redis.get(token);

      if (!result) {
        return res.status(400).json({
          msg: "Invalid or Expired token",
        });
      }

      const response = await passwordModels.reset(req.body, result);

      res.status(201).json({
        data: response.rows[0].email,
        msg: "Password has been reset successfully.",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  },
  send: async (req, res) => {
    const { email } = req.body;

    const result = await userModels.retriveUserByEmail(req.body);

    if (result.rows.length === 0) {
      return res.status(401).json({
        msg: "Email is not registered",
      });
    }

    try {
      const response = await passwordModels.send(email);

      await redis.set(response.toString(), email, 300);

      nodemailer.resetmailer(email, response);

      res.status(200).json({
        msg: `Link reset password sent to ${email}, Please check it.`,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  },
};

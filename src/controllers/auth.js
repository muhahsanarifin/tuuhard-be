const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authModels = require("../models/auth");
const userModels = require("../models/users");
const redis = require("../helpers/redis");
const nodemailer = require("../helpers/nodemailer");

module.exports = {
  login: async (req, res) => {
    try {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!regex.test(req.body.email)) {
        return res.status(400).json({
          msg: "Email format is wrong",
        });
      }

      const result = await userModels.retriveUserByEmail(req.body);

      if (result.rows.length === 0) {
        return res.status(400).json({
          msg: "Email is not registered",
        });
      }

      const resultRetriveAccount = await userModels.retriveAccount(req.body);
      if (resultRetriveAccount.rows[0].status_account === "inactive") {
        return res.status(400).json({
          msg: "Inactive email",
        });
      }

      const match = await bcrypt.compare(
        req.body.password,
        result.rows[0].password
      );

      if (!match) {
        return res.status(400).json({
          msg: "Wrong password",
        });
      }
      const response = await authModels.login(result);

      // t = token, l = login, u = user
      await redis.set(`tlu-${response}`, response, 86400);

      res.status(200).json({
        data: { token: response },
        msg: "Success login",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  },
  register: async (req, res) => {
    try {
      const { password, confirmPassword, email } = req.body;

      const result = await userModels.retriveUserByEmail(req.body);

      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!regex.test(email)) {
        return res.status(400).json({
          msg: "Email format is wrong",
        });
      }

      if (result.rows.length > 0) {
        return res.status(400).json({
          msg: "Email has been registered",
        });
      }

      if (password.length < 8) {
        return res.status(400).json({
          msg: "Password at least eight characters",
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          msg: "Password does not match",
        });
      }

      const response = await authModels.register(req.body);

      const token = jwt.sign(response, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });

      // t = token r = register, u = user,
      await redis.set(`tru-${token}`, token, 86400);

      // Redis
      // await redis.quit();

      // Async || Developer does not use async function to implement nodemailer because latency req process is so high.
      // await nodemailer.mailer(response, token);

      if (response) {
        nodemailer.mailer(response, token);
      }

      res.status(201).json({
        msg: "Registration successful. Please check your email for confirmation",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  },
  confirm: async (req, res) => {
    try {
      const { token } = req.query;

      const response = await authModels.confirm(token);

      res.status(200).json({
        msg: `Email confirmed ${response.rows[0].status_account}. You may now log in`,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal server error.",
      });
    }
  },
  logout: async (req, res) => {
    const token = req.header("Authorization").split(" ")[1];

    try {
      const status = await redis.delete(`tlu-${token}` || `tru-${token}`);

      const response = await authModels.logout(req.userPayload);

      res.status(200).json({
        status: status && "Ok",
        data: response.rows,
        msg: "Logout success.",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  },
};

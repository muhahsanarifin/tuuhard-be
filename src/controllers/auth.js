const authModels = require("../models/auth");
const userModels = require("../models/users");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

module.exports = {
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

      const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        auth: {
          user: process.env.EMAIL_SENDER,
          pass: process.env.PASSWORD_SENDER,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_SENDER,
        to: response.email,
        subject: "Tuuhard | Registertion Confirmation",
        html: `<html>
  <head>
    <meta charset="utf-8">
    <title>Registration Confirmation</title>
  </head>
  <body style="font-family: Arial, sans-serif; font-size: 16px;">
    <h2 style="text-align: center; color: #A5D7E8;">Thank You for Registering!</h2>
    <p style="font-weight: 700;">Dear ${response.email},</p>
    <p>We are pleased to confirm your registration. Please click the <a href="${process.env.URL_DIRECT_TO_CONFIRM}/?token=${token}" style="color: #A5D7E8; font-weight: 700;">link</a></p>
    <p>If you have any questions or concerns, please do not hesitate to contact us at <span style="font-weight:600;">yukduit@gmail.com</span>.</p>
    <p>Thank you again for registering.</p>
    <p>Best regards,<br><span style="font-weight: 700;">tuuhard team</span></p>
  </body>
</html>`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        }
        console.log(info.response);
      });

      res.status(201).json({
        msg: "Registration successful. Please check your email for confirmation",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  },
};

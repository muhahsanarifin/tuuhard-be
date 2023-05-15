const nodemailer = require("nodemailer");

// Async function.

// module.exports = {
//   mailer: async (response, token) => {
//     const { email } = response;
//     try {
//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: process.env.EMAIL_SENDER,
//           pass: process.env.PASSWORD_SENDER,
//         },
//       });

//       const mailOptions = {
//         from: process.env.EMAIL_SENDER,
//         to: email,
//         subject: "Tuuhard | Registertion Confirmation",
//         html: `<html>
//   <head>
//     <meta charset="utf-8">
//     <title>Registration Confirmation</title>
//   </head>
//   <body style="font-family: Arial, sans-serif; font-size: 16px;">
//     <h2 style="text-align: center; color: #A5D7E8;">Thank You for Registering!</h2>
//     <p style="font-weight: 700;">Dear ${email},</p>
//     <p>We are pleased to confirm your registration. Please click the <a href="${process.env.URL_DIRECT_TO_CONFIRM}/?token=${token}" style="color: #A5D7E8; font-weight: 700;">link</a></p>
//     <p>If you have any questions or concerns, please do not hesitate to contact us at <span style="font-weight:600;">yukduit@gmail.com</span>.</p>
//     <p>Thank you again for registering.</p>
//     <p>Best regards,<br><span style="font-weight: 700;">tuuhard team</span></p>
//   </body>
// </html>`,
//       };

//       const result = await transporter.sendMail(mailOptions);
//       console.log("Message sent: %s", result.messageId);
//     } catch (error) {
//       return console.log("Error:", error);
//     }
//   },
// };

module.exports = {
  mailer: (response, token) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
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
        return console.log(err);
      }
      return console.log(info.response);
    });
  },
};

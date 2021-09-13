const express = require("express");
const routes = express.Router();
var nodemailer = require("nodemailer");
const PromiseModule = require("../../helpers/Promise/PromiseModule");
const HTTPStatus = require("../../HTTPStatus");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "mail.diligite@gmail.com",
    pass: "diligite@mar",
  },
});

routes.post("/send-email", async (req, res) => {
  const text = req.body.text || "";
  const to = req.body.to;
  const html = req.body.html || "";
  const subject = req.body.subject || "";

  if (!to || to.length === 0)
    return res.status(HTTPStatus.UNAUTHORIZED).json({ massage: "Email Required" });
  var mailOptions = {
    to: to,
    subject: subject,
    html: html,
    text: text,
  };

  console.log(mailOptions);
  try {
    await PromiseModule.sendMail(mailOptions);
  } catch (error) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Massage cannot be sent" });
  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
    } else {
      res.status(HTTPStatus.OK).json({ massage: "Successfully Send!" });
    }
  });
});

module.exports = routes;

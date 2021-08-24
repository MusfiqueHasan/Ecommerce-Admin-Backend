const express = require("express");
const routes = express.Router();
var nodemailer = require("nodemailer");
const PromiseModule = require("../../helpers/Promise/PromiseModule");

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
    return res.status(401).json({ massage: "Email Required" });
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
    res.status(500).json({ massage: "Massage cannot be sent" });
  }
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
    } else {
      res.status(200).json({ massage: "Successfully Send!" });
    }
  });
});

module.exports = routes;

const express = require("express");
const routes = express.Router();
var nodemailer = require("nodemailer");
const PromiseModule = require("../../helpers/Promise/PromiseModule");
const HTTPStatus = require("../../HTTPStatus");
const { EmailModel } = require("../../Modles/Emails");
const EmailQuery = require("../../Querry/Emails");
const Utils = require("../../Utils/Utils");

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
  const subject = req.body.subject || "";

  if (!to || to.length === 0)
    return res
      .status(HTTPStatus.UNAUTHORIZED)
      .json({ massage: "Email Required" });
  // var mailOptions = {
  //   to: to,
  //   subject: subject,
  //   text: text,
  // };

  try {
    Promise.all(
      to.map(async email => {
        email.trim().length > 0 &&
          (await PromiseModule.sendMail({
            to: email,
            subject: subject,
            text: text,
          }));
      })
    );
    // await PromiseModule.sendMail(mailOptions);
    res.status(HTTPStatus.OK).json({ massage: "Email  sent" });
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Massage cannot be sent" });
  }
});

routes.post("/email-templates", async (req, res) => {
  const template_name = req.body.template_name;
  const emails = req.body.emails || [];

  if (!template_name || template_name.trim().length === 0) {
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ massage: "Template Name Empty" });
  }
  const updated_at = (inserted_at = Utils.getTimeStamp());

  const emailTemplateData = [
    [template_name, JSON.stringify(emails), inserted_at, updated_at],
  ];
  try {
    const response = await EmailQuery.addEmailTemplate([emailTemplateData]);

    const jsonObject = {
      massage: "Success",
    };
    res.status(HTTPStatus.CREATED).json(jsonObject);
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error!" });
  }
});

routes.get("/email-templates", async (req, res) => {
  try {
    const response = await EmailQuery.getEmailTemplates();
    const jsonObject = {
      massage: "Success",
      results: response.map(item => EmailModel(item)),
    };

    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error!" });
  }
});
routes.get("/email-templates/:id", async (req, res) => {
  const { id } = req.params;

  if (!Utils.isIdValid(id))
    return res.status(404).json({ massage: "Email Template is not found" });
  try {
    const response = await EmailQuery.getTemplatesById(id);

    if (response.length === 0)
      return res.status(404).json({ massage: "Email Template is not found" });
    const jsonObject = {
      massage: "Success",
      results: response.map(item => EmailModel(item)),
    };

    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error!" });
  }
});

routes.patch("/email-templates/:id", async (req, res) => {
  const { id } = req.params;
  const template_name = req.body.template_name;
  const emails = req.body.emails || [];

  if (!template_name || template_name.trim().length === 0) {
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ massage: "Template Name Empty" });
  }
  const updated_at = Utils.getTimeStamp();

  const emailTemplateData = [
    template_name,
    JSON.stringify(emails),
    updated_at,
    id,
  ];
  try {
    const response = await EmailQuery.updateEmailTemplates(emailTemplateData);

    const jsonObject = {
      massage: "Updated",
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: error.toString() });
  }
});

routes.delete("/email-templates/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await EmailQuery.deleteEmailTemplates([id]);

    const jsonObject = {
      massage: "Deleted",
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error!" });
  }
});

module.exports = routes;

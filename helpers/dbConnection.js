const { createPool } = require("mysql");

var nodemailer = require("nodemailer");
const {
  HOST,
  USER,
  PASSWORD,
  DATABASE,
  CONNECTION_LIMIT,
  EMAIL,
  EMAIL_PASSWORD,
} = require("../config");
const pool = createPool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  connectionLimit: CONNECTION_LIMIT,
  multipleStatements: true,
});

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "mail.diligite@gmail.com",
    pass: "diligite@mar",
  },
});

module.exports = { pool, transporter };

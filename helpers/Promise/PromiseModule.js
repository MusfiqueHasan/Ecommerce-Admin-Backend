const { pool, transporter } = require("../dbConnection");
const PromiseModule = {
  createUpdateDelete,
  readData,
  sendMail,
  multipleQueryStatement,
};

async function multipleQueryStatement(sqlQuery) {
  return new Promise((resolve, reject) => {
    pool.query(sqlQuery, (error, rows, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}

async function readData(sqlQuery) {
  return new Promise((resolve, reject) => {
    pool.query(sqlQuery, (error, rows, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}

async function createUpdateDelete(sqlQuery, sqlValue) {
  return new Promise((resolve, reject) => {
    pool.query(sqlQuery, sqlValue, (error, rows, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
}

async function sendMail(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}
module.exports = PromiseModule;

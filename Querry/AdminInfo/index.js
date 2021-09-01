const PromiseModule = require("../../helpers/Promise/PromiseModule");

const AdminInfo = {
  getAdminInfo,
  getPaymentDetails,
  updateAdminGeneralInfo,
  updateAdminPaymentInfo,
  getSliderImg,
};

async function getAdminInfo() {
  const sqlSearch = `Select * from admin_informations`;
  return PromiseModule.readData(sqlSearch);
}
async function getPaymentDetails() {
  const sqlSearch = `Select * from admin_payment_options`;
  return PromiseModule.readData(sqlSearch);
}
async function updateAdminGeneralInfo(adminInfo) {
  const sqlUpdate = `Update admin_informations Set email = ?, address = ?, contact_no = ?,schedule = ? where  id = ?`;
  return PromiseModule.createUpdateDelete(sqlUpdate, adminInfo);
}
async function updateAdminPaymentInfo(paymentInfo) {
  const sqlUpdate = `Update admin_payment_options set payment_name = ?,payment_number = ?, status = ? where payment_id = ?; `;

  let query = "";
  paymentInfo.map(
    item =>
      (query += `Update admin_payment_options set payment_name = '${item.payment_name}',payment_number = ${item.payment_number}, status = ${item.status} where payment_id = ${item.payment_id};`)
  );
  console.log(query);

  return PromiseModule.createUpdateDelete(query, paymentInfo);
}

async function getSliderImg(){
  const sqlQuerry = `SELECT * FROM theme_config WHERE name='slider-image'`;
  return PromiseModule.readData(sqlQuerry)
}

module.exports = AdminInfo;

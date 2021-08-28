const { func } = require("joi");
const PromiseModule = require("../../helpers/Promise/PromiseModule");
const { getTimeStamp } = require("../../Utils/Utils");
const userQuerry = {
  getUserInfo,
  updateUserGeneralInfo,
  findUser,
  updateAddress,
  updateProfilePic,
};

async function getUserInfo(userId) {
  const sqlQuerry = `SELECT first_name,last_name,user_name,phone_number,profile_img,division,city,houseNo,landmark,postCode,country,user_role,email FROM user_info WHERE id = ${userId}`;
  return PromiseModule.readData(sqlQuerry);
}

async function updateUserGeneralInfo(
  firstName,
  lastName,
  userName,
  phoneNumber,
  id
) {
  const sqlQuerry = `UPDATE user_info SET user_name = ? , first_name = ?, last_name = ?, phone_number = ?, updated_date = ? WHERE id = ?`;
  const userData = [
    userName,
    firstName,
    lastName,
    phoneNumber,
    getTimeStamp(),
    id,
  ];
  return PromiseModule.createUpdateDelete(sqlQuerry, userData);
}

async function findUser(id) {
  const sqlQuerry = `SELECT * FROM user_info WHERE id = '${id}'`;
  return PromiseModule.readData(sqlQuerry);
}
async function updateProfilePic(userId, fileName) {
  const sqlQuerry = `UPDATE user_info SET profile_img= "${fileName}" WHERE id = "?" `;
  const userData = [userId];
  return PromiseModule.readData(sqlQuerry, userData);
}
async function updateAddress(
  country,
  city,
  division,
  houseNo,
  landmark,
  postCode,
  userId
) {
  const sqlQuery = `UPDATE user_info SET country=? ,city=?, division=?, houseNo=? , landmark=? , postCode=?, updated_date = ? WHERE id = ?`;
  const userData = [
    country,
    city,
    division,
    houseNo,
    landmark,
    postCode,
    getTimeStamp(),
    userId,
  ];
  return PromiseModule.createUpdateDelete(sqlQuery, userData);
}
module.exports = userQuerry;

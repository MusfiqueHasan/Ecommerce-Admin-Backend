const PromiseModule = require("../../helpers/Promise/PromiseModule");
const authQuerry = {
	saveUser,
	isUserExist,
	isUserNameExist,
	updatePassword
};
async function saveUser(name, phoneNumber, eamil, password) {
	const sqlQuery =
		"INSERT into user_info (first_name,phone_number, email,password) VALUES (?,?,?,?)";
	const userData = [name, phoneNumber, eamil, password];
	// console.log(userData)
	return PromiseModule.createUpdateDelete(sqlQuery, userData);
}

async function isUserExist(email, phone_Number) {
	const phoneNumber = phone_Number ? phone_Number : "";
	const sqlQuery = `SELECT * FROM user_info WHERE email = '${email}' or phone_number = '${phoneNumber}'`;
	return PromiseModule.readData(sqlQuery);
}

async function isUserNameExist(userName, phoneNumber, id) {
	const sqlQuery = `SELECT * FROM user_info WHERE ( user_name = '${userName}' or phone_number = ${phoneNumber} ) and id != ${id}`;

	return PromiseModule.readData(sqlQuery);
}

async function updatePassword(id, password) {
	const sqlQuery = `UPDATE user_info SET password = ? , updated_date = ?  WHERE id = ?`;
	const userData = [password, getTimeStamp(), id];
	return PromiseModule.createUpdateDelete(sqlQuery, userData);
}
module.exports = authQuerry;

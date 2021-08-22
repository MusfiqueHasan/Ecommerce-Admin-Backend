const PromiseModule = require("../../helpers/Promise/PromiseModule");
const authQuerry = {
	saveUser,
	isUserExist,
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

module.exports = authQuerry;

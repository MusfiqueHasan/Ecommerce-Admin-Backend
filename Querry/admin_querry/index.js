const PromiseModule = require("../../helpers/Promise/PromiseModule");

const adminAuthQuerry = {
	getAdminAuthInfo,
	checkAdmin,
	checkAdminUsernameEmail,
	saveStaff,
};

async function getAdminAuthInfo() {
	const sqlQuery = `SELECT * FROM admin_auth ORDER BY id DESC`;
	return PromiseModule.readData(sqlQuery);
}

async function checkAdmin(role, email) {
    console.log(role,email)
	const sqlQuery = `SELECT * FROM admin_auth WHERE email = '${email}' and role = '${role}' `;
	return PromiseModule.readData(sqlQuery);
}

async function checkAdminUsernameEmail(userName, email) {
	const sqlQuery = `SELECT * FROM admin_auth WHERE email = '${email}' and userName = '${userName}' `;
	return PromiseModule.readData(sqlQuery);
}
async function saveStaff(username, email, role, password) {
	const sqlQuery = `INSERT INTO admin_auth(userName,email,password,role) VALUES(?,?,?,?)`;
	const data = [username, email, password, role];
	return PromiseModule.createUpdateDelete(sqlQuery, data);
}
module.exports = adminAuthQuerry;

const bcrypt = require("bcrypt");
const { func } = require("joi");

async function encryptPassword(password, next) {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	} catch (err) {
		next(err);
	}
}

async function decreyptPassword(password, dbPassword, next) {
	try {
		return await bcrypt.compare(password, dbPassword);
	} catch (err) {
		next(err);
	}
}

module.exports = {
	encryptPassword,
	decreyptPassword
};

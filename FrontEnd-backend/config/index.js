const dotenv = require("dotenv");
dotenv.config();
module.exports = {
	HOST: process.env.HOST,
	USER: process.env.USER,
	PASSWORD: process.env.PASSWORD,
	DATABASE: process.env.DATABASE,
	CONNECTION_LIMIT: process.env.CONNECTION_LIMIT,
	PORT: process.env.PORT,
	ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET
};

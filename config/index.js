const dotenv = require("dotenv");
dotenv.config()
module.exports = {
  HOST: process.env.API_HOST,
  USER: process.env.API_USER,
  PASSWORD: process.env.API_PASSWORD,
  DATABASE: process.env.API_DATABASE,
  CONNECTION_LIMIT: process.env.API_CONNECTION_LIMIT,
  PORT: process.env.API_PORT,
  ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET
};

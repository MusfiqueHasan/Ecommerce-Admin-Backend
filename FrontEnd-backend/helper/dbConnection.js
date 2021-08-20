const { createPool } = require("mysql");
const {
	HOST,
	USER,
	PASSWORD,
	DATABASE,
	CONNECTION_LIMIT,
} = require("../config");
const pool = createPool({
	host: HOST,
	user: USER,
	password: PASSWORD,
	database: DATABASE,
	connectionLimit: CONNECTION_LIMIT,
});

module.exports = pool;

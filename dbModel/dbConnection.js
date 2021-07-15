const { createPool } = require("mysql");

const pool = createPool({
	host: "localhost",
	user: "root",
	password: "",
	database: "ecommerce",
	connectionLimit: 25,
});

module.exports = pool;

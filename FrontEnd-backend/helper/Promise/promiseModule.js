const pool = require("../dbConnection");
const PromiseModule = {
	createUpdateDelete,
	readData,
};
if (pool) {
	console.log("db connect");
}
async function readData(sqlQuery) {
	return new Promise((resolve, reject) => {
		pool.query(sqlQuery, (error, rows, fields) => {
			if (error) {
				reject(error);
			} else {
				resolve(rows);
			}
		});
	});
}

async function createUpdateDelete(sqlQuery, sqlValue) {
	return new Promise((resolve, reject) => {
		pool.query(sqlQuery, sqlValue, (error, rows, fields) => {
			if (error) {
				reject(error);
			} else {
				resolve(rows);
			}
		});
	});
}

module.exports = PromiseModule;

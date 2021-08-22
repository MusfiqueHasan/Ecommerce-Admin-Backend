const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../../config");
// const clinet = require("../redis/init_redis");
// const client = require("../redis/init_redis");
// create token
async function signAccessToken(userId) {
	return new Promise((resolve, reject) => {
		const authData = {
			aud: userId,
		};
		console.log("type", typeof userId);
		const secret = ACCESS_TOKEN_SECRET;
		const options = {
			expiresIn: "15s",
			issuer: "ourwebsite.com",
		};
		JWT.sign(authData, secret, options, (err, token) => {
			if (err) {
				console.log(err);
				return reject(createError.InternalServerError());
			}
			resolve(token);
		});
	});
}
// verify token
async function verifyAccessToken(req, res, next) {
	if (!req.headers["authorization"]) return next(createError.Unauthorized());
	const authHeader = req.headers["authorization"];
	const bearerToken = authHeader.split(" ");
	const token = bearerToken[1];
	JWT.verify(token, ACCESS_TOKEN_SECRET, (err, authData) => {
		if (err) {
			const message =
				err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
			return next(createError.Unauthorized(message));
		}

		req.authData = authData;
		next();
	});
}

// create refresh token
async function signRefreshToken(userId) {
	return new Promise((resolve, reject) => {
		const authData = {
			aud: userId,
		};

		const secret = REFRESH_TOKEN_SECRET;
		const options = {
			expiresIn: "30s",
			issuer: "ourwebsite.com",
		};
		JWT.sign(authData, secret, options, (err, token) => {
			if (err) {
				console.log(err);
				return reject(createError.InternalServerError());
			}
			// // saving new refresh token in db
			// client.SET(userId, token, "EX", 30, (err, reply) => {
			// 	if (err) {
			// 		console.log(err);
			// 		return reject(createError.InternalServerError());
			// 	}
			// 	resolve(token);
			// });
			resolve(token);

		});
	});
}

async function verifyRefreshToken(refreshtoken) {
	return new Promise((resolve, reject) => {
		const secret = REFRESH_TOKEN_SECRET;

		JWT.verify(refreshtoken, secret, (err, authData) => {
			if (err) {
				reject(createError.Unauthorized(err.message));
				return;
			}
			const userId = authData.aud;
			return resolve(userId);

			// console.log(authData);

			// here userId is email
			// check db has this refresh token
			// client.GET(userId, (err, result) => {
			// 	if (err) {
			// 		console.log(err);
			// 		return reject(createError.InternalServerError());
			// 	}
			// 	// user has refreshtoken now match with current token
			// 	if (result === refreshtoken) {
			// 		return resolve(userId);
			// 	}
			// 	return reject(createError.Unauthorized());
			// });
		});
	});
}

// delete token forn redis

async function deleteRefreshToken(userId) {
	return new Promise((resolve, reject) => {
		client.DEL(userId, (err, replay) => {
			if (err) {
				console.log(err.message);
				return reject(createError.InternalServerError());
			}
			return resolve(true);
		});
	});
}

module.exports = {
	signAccessToken,
	verifyAccessToken,
	signRefreshToken,
	verifyRefreshToken,
	deleteRefreshToken,
};

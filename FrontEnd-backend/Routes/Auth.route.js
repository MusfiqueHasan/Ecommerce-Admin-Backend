const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const authQuerry = require("../Querry/authQuerry/authQuerry");
const {
	registerSchema,
	loginSchema,
} = require("../helper/ValidationSchema/authSchema");
const {
	encryptPassword,
	decreyptPassword,
} = require("../helper/ValidationSchema/encrypt");
const {
	signAccessToken,
	signRefreshToken,
	verifyAccessToken,
	verifyRefreshToken,
	deleteRefreshToken,
} = require("../helper/jwt_helper/jwt_token");

router.post("/register", async (req, res, next) => {
	// console.log(req.body);

	try {
		// validate eamil , password using joi
		console.log(req.body);
		const { name, phonenumber, email, password } =
			await registerSchema.validateAsync(req.body);

		// if (!email || !password) throw createError.BadRequest();

		// check user exist in database by email
		const UserExist = await authQuerry.isUserExist(email, phonenumber);
		if (UserExist.length > 0) {
			// res.send(UserExist[0].email);
			// if exist  send error conflict user already exist
			throw createError.Conflict("User already exist");
		} else {
			// crpty password
			const hashPassword = await encryptPassword(password);

			//  save user
			const response = await authQuerry.saveUser(
				name,
				phonenumber,
				email,
				hashPassword
			);

			// generate access token for user
			if (!response) {
				throw createError.InternalServerError();
			}
			const accessToken = await signAccessToken(email);

			// generate refresh token for user
			const refreshToken = await signRefreshToken(email);
			// console.log("response", typeof toString(insertId));
			// now send sucess message
			res.status(201).json({
				status: "Successful",
				message: "account created successfully",
				email:email,
				accessToken: accessToken,
				refreshToken: refreshToken,
			});
		}
	} catch (err) {
		if (err.isJoi == true) {
			// err.status = 422;
			next(createError.UnprocessableEntity(err.message));
		}
		next(err);
	}
});

router.post("/login", async (req, res, next) => {
	try {
		const { email, password } = await loginSchema.validateAsync(req.body);
		// check is user exist
		const UserExist = await authQuerry.isUserExist(email);
		if (UserExist.length > 0) {
			const { first_name, phone_number } = UserExist;
			// if exist, match password
			const isMatch = await decreyptPassword(password, UserExist[0].password);
			if (isMatch === true) {
				// successfully match now create token
				const accessToken = await signAccessToken(email);

				// generate refresh token for user
				const refreshToken = await signRefreshToken(email);
				// now send token

				res.status(200).json({
					status: "successfull",
					message: `Wellcome back ${email}`,
					accessToken: accessToken,
					refreshToken: refreshToken,
				});
			} else {
				throw createError.NotFound("Username or password not valid");
			}
		} else {
			throw createError.NotFound("Username or password not valid");
		}
	} catch (err) {
		if (err.isJoi === true)
			next(createError.BadRequest("Invalid email/password"));
		next(err);
	}
});

router.post("/refresh-token", async (req, res, next) => {
	try {
		const { refreshToken } = req.body;
		// check req contain refersh token else bad request
		if (!refreshToken) {
			next(createError.BadRequest());
		}
		// get email
		const email = await verifyRefreshToken(refreshToken);
		// create new pair of accessToken and Refresh Token
		// console.log(email);
		const newAccessToken = await signAccessToken(email);
		const newRefreshToken = await signRefreshToken(email);

		res.send({ accessToken: newAccessToken, refreshToken: newRefreshToken });
	} catch (err) {
		next(err);
	}
});

router.post("/logout", async (req, res, next) => {
	try {
		const { refreshToken } = req.body;
		if (!refreshToken) {
			next(createError.BadRequest());
		}
		const email = await verifyRefreshToken(refreshToken);
		if (!email) {
			next(createError.BadRequest());
		}
		const response = await deleteRefreshToken(email);
		if (response) {
			res.status(202).json({
				status: 202,
				message: "Logout succssfully",
			});
		}
	} catch (err) {
		next(err);
	}
});

module.exports = router;

const express = require("express");
const routes = express.Router();
const createError = require("http-errors");
const { valid } = require("joi");
const AdminAuthQuerry = require("../../Querry/admin_querry");
const {
	encryptPassword,
	decreyptPassword,
} = require("../../helpers/ValidationSchema/encrypt");
const {
	signAccessToken,
	signRefreshToken,
	verifyAccessToken,
	verifyRefreshToken,
	deleteRefreshToken,
} = require("../../helpers/jwt_helper/jwt_token");
routes.post("/register", async (req, res, next) => {
	try {
		// validate eamil , password using joi
		// console.log(req.body);
		const {
			adminRole,
			adminEmail,
			newStaffUsername,
			newStaffEmail,
			newStaffPassword,
			newStaffRole,
		} = req.body;
		// await registerSchema.validateAsync(req.body);
		if (adminRole !== "Admin") {
			// console.log(adminRole,adminEmail,newStaffEmail,newStaffPassword,newStaffRole,newStaffUsername)

			throw createError.BadRequest("Invalid Request");
		} else {
			//    now check is admin is valid
			const checkAdmin = await AdminAuthQuerry.checkAdmin(
				adminRole,
				adminEmail
			);

			if (checkAdmin.length > 0) {
				const adminUsernameEmail =
					await AdminAuthQuerry.checkAdminUsernameEmail(
						newStaffUsername,
						newStaffEmail
					);
				if (adminUsernameEmail.length > 0) {
					throw createError.BadRequest("Invalid New Staff username,Password");
				} else {
					//    save new staff

					const hashPassword = await encryptPassword(newStaffPassword);

					const resData = await AdminAuthQuerry.saveStaff(
						newStaffUsername,
						newStaffEmail,
						newStaffRole,
						hashPassword
					);
					res.status(200).json({
						status: "successfull",
						message: `New ${newStaffRole} account created`,
					});
				}
			} else {
				throw createError.BadRequest("Invalid Request");
			}
		}
	} catch (err) {
		next(err);
	}
});

routes.post("/login", async (req, res, next) => {
	try {
		const { email, role, password } = req.body;
		// check is user exist
		if (role === "Admin" || role === "Staff") {
			const adminUserExist = await AdminAuthQuerry.checkAdmin(role, email);
			if (adminUserExist.length > 0) {
				// const { first_name, phone_number } = userExist;
				// if exist, match password
				const isMatch = await decreyptPassword(
					password,
					adminUserExist[0].password
				);
				if (isMatch === true) {
					// successfully match now create token
					const accessToken = await signAccessToken(email);

					// generate refresh token for user
					const refreshToken = await signRefreshToken(email);
					// now send token

					res.status(200).json({
						status: "successfull",
						message: `Wellcome back ${email}`,
                        email:email,
                        adminId:adminUserExist[0].id,
						accessToken: accessToken,
						refreshToken: refreshToken,
					});
				} else {
					throw createError.NotFound("Username or password not valid");
				}
			} else {
				throw createError.NotFound("Username or password not valid");
			}
		} else {
			throw createError.Unauthorized("Invalid User");
		}
	} catch (err) {
		// console.log(err)
		// if (err.isJoi === true)
		// 	next(createError.BadRequest("Invalid email/password"));
		next(err);
	}
});

routes.post("/refresh-token", async (req, res, next) => {
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

routes.post("/logout", async (req, res, next) => {
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

routes.get("/checkadminRoute",verifyAccessToken, async (req, res) => {
	res.send("Working");
});

module.exports = routes;

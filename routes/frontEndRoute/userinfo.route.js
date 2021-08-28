const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const multer = require("multer");
const path = require("path");
const authQuerry = require("../../Querry/authQuerry/authQuerry");
const userQuerry = require("../../Querry/userQuerry/userinfoQuerry");

const {
	encryptPassword,
	decreyptPassword,
} = require("..//../helpers/ValidationSchema/encrypt");
const { date } = require("joi");

const storage = multer.diskStorage({
	destination: "./upload/images",
	filename: (req, file, cb) => {
		return cb(null, `profile.${Date.now()}${path.extname(file.originalname)}`);
	},
});

const upload = multer({
	storage: storage,
	// limits:{fileSize:1000000}
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
});

// check file type
function checkFileType(file, cb) {
	const fileType = /jpeg|jpg|png/;
	const extName = fileType.test(path.extname(file.originalname).toLowerCase());
	const mimeType = fileType.test(file.mimetype);
	if (extName && mimeType) {
		return cb(null, true);
	} else {
		console.log("err");
		cb(createError.BadRequest("Image Only"));
	}
}

router.post("/update/generalInfo", async (req, res, next) => {
	try {
		const { firstName, lastName, userName, phoneNumber, userId } = req.body;
		const userNameExist = await authQuerry.isUserNameExist(
			userName,
			phoneNumber,
			userId
		);
		if (userNameExist.length > 0) {
			throw createError.Conflict(
				"You cannot use this Username or phone number"
			);
		} else {
			const updateDb = await userQuerry.updateUserGeneralInfo(
				firstName,
				lastName,
				userName,
				phoneNumber,
				userId
			);
			res.status(200).json({
				message: "updated successfully",
			});
		}
	} catch (err) {
		next(err);
	}
});

router.get("/:userId", async (req, res, next) => {
	const { userId } = req.params;
	const result = await userQuerry.getUserInfo(userId);
	if (result) {
		res.status(200).json(result);
	} else {
		throw createError.Unauthorized();
	}
});

router.post("/update/password", async (req, res, next) => {
	try {
		const { userId, email, password, newPassword } = req.body;
		const user = await userQuerry.findUser(userId);
		// console.log(user);
		if (user.length > 0) {
			const isMatch = await decreyptPassword(password, user[0].password);
			if (isMatch) {
				const hashPassword = await encryptPassword(newPassword);
				// update password
				const passUpdate = await authQuerry.updatePassword(
					userId,
					hashPassword
				);
				if (passUpdate) {
					res.status(200).json({
						message: "password update successfully",
					});
				} else throw createError.InternalServerError();
			} else {
				throw createError.NotFound("user not found");
			}
		} else {
			throw createError.BadRequest("User doesnot exist");
		}
	} catch (err) {
		next(err);
	}
});

router.post(
	"/update/profilepic",
	upload.single("profile"),
	async (req, res, next) => {
		try {
			const { userId } = req.body;
			const fileName = req.file.filename;
			const updateProfielPic = await userQuerry.updateProfilePic(
				userId,
				fileName
			);
			if (updateProfielPic) {
				res.send("successfull");
			}
		} catch (err) {
			console.log(err);
			next(err);
		}
	}
);

router.post("/update/address", async (req, res, next) => {
	try {
		const { userId, country, city, division, houseNo, landMark, postCode } =
			req.body;
		const user = await userQuerry.findUser(userId);
		if (user.length > 0) {
			const updatedata = await userQuerry.updateAddress(
				country,
				city,
				division,
				houseNo,
				landMark,
				postCode,
				userId
			);
			if (updatedata) {
				console.log(updatedata);
				res.status(200).json({
					message: "updated successfully",
				});
			} else {
				throw createError.InternalServerError();
			}
		}
	} catch (err) {
		next(err);
	}
});
module.exports = router;

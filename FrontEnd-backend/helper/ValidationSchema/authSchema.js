const joi = require("joi");

const registerSchema = joi.object({
	name: joi.string().alphanum().min(3).max(11).required(),
	phonenumber: joi.string().min(9).max(11).required(),
	email: joi.string().email().lowercase().required(),
	password: joi.string().min(2).required(),
});
const loginSchema = joi.object({
	email: joi.string().email().lowercase().required(),
	password: joi.string().min(2).required(),
});
module.exports = {
	registerSchema,
	loginSchema,
};

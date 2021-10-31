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
const checkOutSchema = joi.object({
	userId: joi.number().min(1).required(),
	fullName: joi.string().min(2).max(15).required(),
	email: joi.string().email().lowercase().required(),
	phoneNumber: joi.string().min(9).max(11).required(),
	country: joi.string().min(3).max(15).required(),
	division: joi.string().min(2).max(14).required(),
	city: joi.string().min(2).max(14).required(),
	address: joi.string().min(3).max(40).required(),
	payOption: joi.string().min(2).max(20).required(),
	payMedium: joi.string().min(2).max(20).allow(null, ""),
	message: joi.string().min(4).allow(null, ""),
	payPhnNumber: joi.string().min(9).max(11).allow(null, ""),
	transId: joi.string().min(11).max(30).allow(null, ""),
	orderedItems: joi.array().min(1).required(),
	totalCost: joi.number().greater(100).required(),
	shippingCost: joi.number().min(5).greater(5).allow(0),
	orderTypeId: joi.number().min(0).allow(null, ""),
});
const orderdItemsSchema = joi.object({
	productId: joi.number().min(1).required(),
	name: joi.string().min(2).max(100).required(),
	qty: joi.number().greater(0).required(),
	variants: joi.string().min(2),
	price: joi.number().greater(10).required(),
});
const paymentValidation = (payOption, transId, phoneNumber) => {
       
	if (payOption === "Online Payment") {
		
		if (transId && phoneNumber) {
			
			return true;
		} else {
			return false};
	}
	return true;
};

const permissionSchema = joi.object({
	user_id: joi.number().min(1).required(),
	routing_id: joi.string().required(),
	read_operation: joi.string().min(4).max(5).required(),
	update_operation: joi.string().min(4).max(5).required(),
	delete_operation: joi.string().min(4).max(5).required(),
});

module.exports = {
	registerSchema,
	loginSchema,
	checkOutSchema,
	orderdItemsSchema,
	paymentValidation,
	permissionSchema,
};

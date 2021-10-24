const express = require("express");
const authQuerry = require("../../Querry/authQuerry/authQuerry");
const orderQuerry = require("../../Querry/ecommerceQuery/orderQuerry");
const createError = require("http-errors");
const {
	checkOutSchema,
	orderdItemsSchema,
	paymentValidation,
} = require("../../helpers/ValidationSchema/authSchema");

const { func } = require("joi");
const HTTPStatus = require("../../HTTPStatus");
//const { json } = require("express");
const router = express.Router();
router.get("/", (req, res) => {
	res.send("Ecommerce Route");
});

router.post("/checkout", async (req, res, next) => {
	try {
		const {
			userId,
			email,
			fullName,
			phoneNumber,
			country,
			division,
			city,
			address,
			payOption,
			payMedium,
			payPhnNumber,
			message,
			transId,
			orderedItems,
			totalCost,
			shippingCost,
			orderTypeId
		} = await checkOutSchema.validateAsync(req.body);

		let orderType_id = orderTypeId
		if (!orderTypeId) {
			let order_type_name = "From website"
			const ordertypeIdtemp = await orderQuerry.getDefaultOrderType(order_type_name)
			const data = {
				results: ordertypeIdtemp.map(item => {
					return { order_type_id: item.order_type_id }
				})
			}
			orderType_id = data.results[0].order_type_id
		}
		const validpayment = await paymentValidation(
			payOption,
			transId,
			payPhnNumber
		);
		if (!validpayment) {
			throw createError.BadRequest(
				"Please give your Phone Number & Transaction Id"
			);
		}
		// const resp = await orderedItems.map(async (item) => {
		// 	await orderdItemsSchema.validateAsync(item);
		// });
		// check user exist
		const UserExist = await authQuerry.isUserExistByUserId(userId);
		if (UserExist.length <= 0) {
			//    user dont exist
			throw createError.BadRequest("Invalid Request");
		} else {
			// check all data send in valid order
			// than save order
			let itemsId = [];
			orderedItems.map((item) => {
				itemsId.push(item.productId);
			});
			const productId = JSON.stringify(itemsId);
			const orderStored = await orderQuerry.saveOrder(
				userId,
				email,
				fullName,
				phoneNumber,
				productId,
				orderType_id,
				country,
				division,
				city,
				address,
				payOption,
				payMedium,
				message,
				payPhnNumber,
				transId,
				totalCost,
				shippingCost
			);
			// get order Id
			const orderId = orderStored.insertId;
			// now save each ordered product

			orderedItems.map(async (item) => {
				const variants = item.variants ? item.variants : "";
				try {
					const saveItem = await orderQuerry.saveOrderedItems(
						orderId,
						item.productId,
						item.name,
						variants,
						item.qty,
						item.price
					);
				} catch (err) {
					console.log(err);
					next(err);
				}

				// if (!saveItem) {
				// 	res.status().json({
				// 		status: "Error",
				// 		message: `Something went Wrong with this product ${item.name}. Contact with Bay of Syle.`,
				// 	});
				// }
				// console.log(saveItem)
			});

			res.status(HTTPStatus.OK).json({
				status: "successfull",
				message: "Thanks for order",
			});
		}
	} catch (err) {
		console.log(err)
		if (err.isJoi == true) {
			
			// err.status = 422;
			next(createError.UnprocessableEntity(err.message));
		}
		next(err);
	}
});

// router.post("/order", async (req, res, next) => {
// 	try {
// 		const {
// 			email,
// 			fullName,
// 			phoneNumber,
// 			division,
// 			city,
// 			houseNo,
// 			landMark,
// 			postCode,
// 			payOption,
// 			payMedium,
// 			message,
// 			payPhnNumber,
// 			transId,
// 			orderedItems,
// 			totalCost,
// 			shippingCost,
// 		} = req.body;
// 		// check user exist
// 		const UserExist = await authQuerry.isUserExist(email);
// 		if (UserExist.length <= 0) {
// 			//    user dont exist
// 			throw createError.BadRequest("Invalid Request");
// 		} else {
// 			// check all data send in valid order
// 			// than save order
// 			let itemsId = [];
// 			orderedItems.map((item) => {
// 				itemsId.push(item.productId);
// 			});
// 			const productId = JSON.stringify(itemsId);
// 			const orderStored = await orderQuerry.saveOrder(
// 				email,
// 				fullName,
// 				phoneNumber,
// 				productId,
// 				division,
// 				city,
// 				houseNo,
// 				landMark,
// 				postCode,
// 				payOption,
// 				payMedium,
// 				message,
// 				payPhnNumber,
// 				transId,
// 				totalCost,
// 				shippingCost
// 			);
// 			// get order Id
// 			const orderId = orderStored.insertId;
// 			// now save each ordered product
// 			orderedItems.map(async (item) => {
// 				const variants = item.variants ? item.variants : "";
// 				const saveItem = await orderQuerry.saveOrderedItems(
// 					orderId,
// 					item.productId,
// 					item.name,
// 					variants,
// 					item.qty,
// 					item.price
// 				);
// 				// console.log(saveItem)
// 			});

// 			res.status(HTTPStatus.OK).json({
// 				status: "successfull",
// 				message: "Thanks for order",
// 			});
// 		}
// 	} catch (err) {
// 		console.log(error);
// 		next(err);
// 	}
// });

router.get("/user-order/all/:userId", async (req, res, next) => {
	const userId = req.params.userId;
	try {
		const allOrders = await orderQuerry.userAllOrder(userId);
		res.status(HTTPStatus.OK).json({ allOrders });
	} catch (err) {
		next(err);
	}
});
router.get("/user-order/pending/:userId", async (req, res, next) => {
	try {
		const userId = req.params.userId;
		const allOrders = await orderQuerry.userPendingOrder(userId);
		res.status(HTTPStatus.OK).json({ allOrders });
	} catch (err) {
		next(err);
	}
});
router.get("/pre-order/pending/:userId", async (req, res, next) => {
	const userId = req.params.userId;
	// console.log(email);
	const pandingPreOrders = await orderQuerry.pandingPreOrders(userId);
	console.log(pandingPreOrders);
	res.status(HTTPStatus.OK).json({ pandingPreOrders });
});
router.post("/pre-order", async (req, res, next) => {
	try {
		const {
			userId,
			email,
			productName,
			productDetails,
			brand,
			qty,
			phoneNumber,
			productType,
		} = req.body;
		const userExist = await authQuerry.isUserExist(email);
		if (userExist.length > 0) {
			// need to check token and valid data send buy client

			// save preorder
			const preOrdersaved = orderQuerry.savePreOrder(
				userId,
				email,
				productName,
				productType,
				productDetails,
				brand,
				qty,
				phoneNumber
			);
			if (preOrdersaved) {
				res.status(HTTPStatus.OK).json({
					status: "successfull",
					message: "Thanks for order",
				});
			}
		} else {
			throw createError.NotFound("Invalid User");
		}
	} catch (err) {
		next(err);
	}
});
router.get("/shippingCost/:ids", async (req, res, next) => {
	const productIds = req.params.ids;
	console.log(productIds)
	try {
		const getShippingCost = await orderQuerry.getSingleProductShippingCost(
			productIds
		);
		if (getShippingCost) {
			res.status(HTTPStatus.OK).json({
				status: "successfull",
				data: getShippingCost,
			});
		}
	} catch (err) {
		next(err);
	}
});
module.exports = router;

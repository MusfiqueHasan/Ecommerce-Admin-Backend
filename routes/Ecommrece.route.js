const express = require("express");
const authQuerry = require("../Querry/authQuerry/authQuerry");
const orderQuerry = require("../Querry/ecommerceQuery/orderQuerry");
const createError = require("http-errors");
const { json } = require("express");

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Ecommerce Route");
});

router.post("/order", async (req, res, next) => {
	try {
		const {
			email,
			fullName,
			phoneNumber,
			division,
			city,
			houseNo,
			landMark,
			postCode,
			payOption,
			payMedium,
			message,
			payPhnNumber,
			transId,
			orderedItems,
			totalCost,
			shippingCost,
		} = req.body;
		// check user exist
		const UserExist = await authQuerry.isUserExist(email);
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
				email,
				fullName,
				phoneNumber,
				productId,
				division,
				city,
				houseNo,
				landMark,
				postCode,
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
				const saveItem = await orderQuerry.saveOrderedItems(
					orderId,
					item.productId,
					item.name,
					variants,
					item.qty,
					item.price
				);
				// console.log(saveItem)
			});

			res.status(200).json({
				status: "successfull",
				message: "Thanks for order",
			});
		}
	} catch (err) {
		next(err);
	}
});

router.get("/user-order/all/:userId", async (req, res, next) => {
	const email = req.params.userId;
	const allOrders = await orderQuerry.userAllOrder(email);
	res.status(200).json(allOrders)
});
router.get("/user-order/pending/:userId", async (req, res, next) => {
	const email = req.params.userId;
	const allOrders = await orderQuerry.userPendingOrder(email);
	res.status(200).json(allOrders)
});
module.exports = router;

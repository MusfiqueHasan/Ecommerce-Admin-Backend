const PromiseModule = require("../../helper/Promise/promiseModule");
const { getTimeStamp } = require("../../Utils/Utils");
const orderQuerry = {
	saveOrder,
	saveOrderedItems,
	userAllOrder,
	userPendingOrder,
};
async function saveOrder(
	email,
	fullName,
	phoneNumber,
	productId,
	division,
	city,
	houseNo,
	landmark,
	postCode,
	payOption,
	payMedium,
	message,
	payPhnNumber,
	transId,
	totalCost,
	shippingCost
) {
	const sqlQuery =
		"INSERT INTO orderdata (user_fullname,user_email,phonenumber,productId,order_status,pay_option,pay_medium,pay_phoneNumber,transactionId,message,division,city,houseNo,landmark,postCode,total_price,shipping_cost) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	const orderData = [
		fullName,
		email,
		phoneNumber,
		productId,
		"0",
		payOption,
		payMedium,
		payPhnNumber,
		transId,
		message,
		division,
		city,
		houseNo,
		landmark,
		postCode,
		totalCost,
		shippingCost,
	];
	return PromiseModule.createUpdateDelete(sqlQuery, orderData);
}

async function saveOrderedItems(
	orderId,
	productId,
	productName,
	variants,
	qty,
	price
) {
	const sqlQuery =
		"INSERT INTO orderedproduct (orderId,productId,product_name,variants,qty,price,status) VALUES (?,?,?,?,?,?,?)";
	const itemsData = [
		orderId,
		productId,
		productName,
		variants,
		qty,
		price,
		"0",
	];
	return PromiseModule.createUpdateDelete(sqlQuery, itemsData);
}
async function userAllOrder(email) {
	const sqlQuery = `SELECT orderedproduct.product_name,orderedproduct.variants,orderedproduct.qty,orderedproduct.price,orderedproduct.status, orderdata.order_data FROM orderdata INNER JOIN orderedproduct ON orderdata.id=orderedproduct.orderId and user_email = '${email}'`;
	return PromiseModule.readData(sqlQuery);
}
async function userPendingOrder(email) {
	const sqlQuery = `SELECT orderedproduct.product_name,orderedproduct.variants,orderedproduct.qty,orderedproduct.price,orderedproduct.status, orderdata.order_data FROM orderdata INNER JOIN orderedproduct ON orderdata.id=orderedproduct.orderId and user_email = '${email}' and orderedproduct.status='0'`;
	return PromiseModule.readData(sqlQuery);
}
module.exports = orderQuerry;

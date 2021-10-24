const PromiseModule = require("../../helpers/Promise/PromiseModule");

const orderQuerry = {
	saveOrder,
	saveOrderedItems,
	userAllOrder,
	userPendingOrder,
	savePreOrder,
	pandingPreOrders,
	getAllOrders,
	getOrderInformationById,
	getUserInformationOfUser,
	updateOrderStatus,
	getAllPreOrders,
	updatePreOrderStatus,
	deletePreOrderById,
	getSingleProductShippingCost,
	getAllOrderType,
	addOrderType,
	updateOrderType,
	deleteOrderType,
	getDefaultOrderType
};
async function saveOrder(
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
) {
	const sqlQuery =
		"INSERT INTO orderdata (user_id,user_fullname,user_email,phonenumber,productId,order_type,order_status,pay_option,pay_medium,pay_phoneNumber,transactionId,message,division,city,total_price,shipping_cost,address,country) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	const orderData = [
		userId,
		fullName,
		email,
		phoneNumber,
		productId,
		orderType_id,
		"On hold",
		payOption,
		payMedium,
		payPhnNumber,
		transId,
		message,
		division,
		city,
		totalCost,
		shippingCost,
		address,
		country,
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
		"INSERT INTO orderedproduct (orderId,productId,product_name,variants,qty,price) VALUES (?,?,?,?,?,?)";
	const itemsData = [orderId, productId, productName, variants, qty, price];
	return PromiseModule.createUpdateDelete(sqlQuery, itemsData);
}
async function userAllOrder(userId) {
	const sqlQuery = `SELECT orderdata.id,orderedproduct.product_name,orderedproduct.variants,orderedproduct.qty,orderedproduct.price,orderdata.order_status as status , orderdata.order_date FROM orderdata INNER JOIN orderedproduct ON orderdata.id=orderedproduct.orderId and user_id = '${userId}' ORDER by order_date DESC`;
	return PromiseModule.readData(sqlQuery);
}
async function userPendingOrder(userId) {
	const sqlQuery = `SELECT orderdata.id,orderedproduct.product_name,orderedproduct.variants,orderedproduct.qty,orderedproduct.price,orderdata.order_status as status ,orderdata.order_date FROM orderdata INNER JOIN orderedproduct ON orderdata.id=orderedproduct.orderId and orderdata.user_id = '${userId}' and orderdata.order_status='On hold' ORDER by order_date DESC`;
	return PromiseModule.readData(sqlQuery);
}

async function savePreOrder(
	userId,
	email,
	productName,
	productType,
	productDetails,
	brand,
	qty,
	phoneNumber
) {
	const sqlQuery =
		"INSERT INTO preorder (user_id,user_email,product_name,product_details,product_type,product_brand,qty,status,user_phoneNumber) VALUES (?,?,?,?,?,?,?,?,?)";
	const preOrderData = [
		userId,
		email,
		productName,
		productDetails,
		productType,
		brand,
		qty,
		"On hold",
		phoneNumber,
	];

	return PromiseModule.createUpdateDelete(sqlQuery, preOrderData);
}

async function pandingPreOrders(userId) {
	const sqlQuery = `SELECT * from preorder where user_id = '${userId}' ORDER by order_date DESC`;
	return PromiseModule.readData(sqlQuery);
}

async function getAllOrders() {
	const sqlSearch = `Select o.id, o.user_id,o.total_price,o.division,o.transactionId,o.order_status, o.pay_phoneNumber, o.user_email, o.user_fullname,o.order_date  from orderdata as o, user_info as uf where o.user_id = uf.id order by o.id desc`;
	return PromiseModule.readData(sqlSearch);
}

async function getOrderInformationById(orderId) {
	const sqlQuery = `SELECT * from orderedproduct where orderId = ${orderId} `;
	return PromiseModule.readData(sqlQuery);
}
async function getUserInformationOfUser(orderId) {
	const sqlQuery = `SELECT  orderdata.order_date,orderdata.user_email,orderdata.order_date,orderdata.order_status,orderdata.order_date,orderdata.pay_option,orderdata.pay_medium,orderdata.pay_phoneNumber,orderdata.transactionId,orderdata.message,orderdata.division,orderdata.city,orderdata.houseNo,orderdata.landmark,orderdata.postCode,orderdata.phonenumber,orderdata.total_price,orderdata.shipping_cost,orderdata.id ,user_info.first_name,user_info.last_name,user_info.email,user_info.phone_number,orderdata.user_fullname FROM orderdata,user_info WHERE user_info.id = orderdata.user_id And orderdata.id = ${orderId}`;
	return PromiseModule.readData(sqlQuery);
}

async function updateOrderStatus(orderId, data) {
	const sqlUpdate = "UPDATE `orderdata` SET `order_status`=(?) WHERE id = (?)";
	return PromiseModule.createUpdateDelete(sqlUpdate, [data, orderId]);
}
async function updatePreOrderStatus(orderId, status) {
	const sqlUpdate = "UPDATE `preorder` SET `status`=(?) WHERE id = (?)";
	return PromiseModule.createUpdateDelete(sqlUpdate, [status, orderId]);
}

async function getAllPreOrders() {
	const sqlSearch = `Select * from preorder ORDER BY preorder.id DESC`;
	return PromiseModule.readData(sqlSearch);
}

async function deletePreOrderById(id) {
	const sqlQuery = `DELETE FROM preorder WHERE id = (?)`;
	return PromiseModule.createUpdateDelete(sqlQuery, [id]);
}
async function getSingleProductShippingCost(productIds) {
	const sqlQuery = `SELECT * FROM product_shipping INNER JOIN shipping ON shipping_id = shipping.shipping_class_id and product_id in (${productIds})`;
	return PromiseModule.readData(sqlQuery);
}

async function getAllOrderType() {
	const sqlSearch = `SELECT * FROM order_type ORDER BY order_type_id DESC`;
	return PromiseModule.readData(sqlSearch);
}

async function addOrderType(inputArray) {
    const sqlQuerry = "INSERT INTO order_type (order_type_name, inserted_at) Values?";
    return PromiseModule.createUpdateDelete(sqlQuerry,inputArray);
}

async function updateOrderType(inputArray) {
    const sqlQuerry = "UPDATE order_type SET order_type_name = ? , updated_at = ?  WHERE order_type_id = ?";
    return PromiseModule.createUpdateDelete(sqlQuerry,inputArray);    
}

async function deleteOrderType(inputArray) {
    const sqlQuerry = `DELETE FROM order_type WHERE order_type_id = ?`;
    return PromiseModule.createUpdateDelete(sqlQuerry,inputArray);    
}

async function getDefaultOrderType(order_type_name) {
	const sqlSearch = `SELECT order_type_id FROM order_type WHERE order_type_name='${order_type_name}'`;
	return PromiseModule.readData(sqlSearch);
}

module.exports = orderQuerry;

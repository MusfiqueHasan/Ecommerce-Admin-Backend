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
  deletePreOrderById
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
    "On hold",
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
    1,
  ];
  return PromiseModule.createUpdateDelete(sqlQuery, itemsData);
}
async function userAllOrder(email) {
  const sqlQuery = `SELECT orderedproduct.product_name,orderedproduct.variants,orderedproduct.qty,orderedproduct.price,orderedproduct.status, orderdata.order_date FROM orderdata INNER JOIN orderedproduct ON orderdata.id=orderedproduct.orderId and user_email = '${email}' ORDER by order_date DESC`;
  return PromiseModule.readData(sqlQuery);
}
async function userPendingOrder(email) {
  const sqlQuery = `SELECT orderedproduct.product_name,orderedproduct.variants,orderedproduct.qty,orderedproduct.price,orderdata.order_status as status, orderdata.order_date FROM orderdata INNER JOIN orderedproduct ON orderdata.id=orderedproduct.orderId and user_email = '${email}' and orderedproduct.status='On hold' ORDER by order_date DESC`;
  return PromiseModule.readData(sqlQuery);
}

async function savePreOrder(
  email,
  productName,
  productType,
  productDetails,
  brand,
  qty,
  phoneNumber
) {
  const sqlQuery =
    "INSERT INTO preorder (user_email,product_name,product_details,product_type,product_brand,qty,status,user_phoneNumber) VALUES (?,?,?,?,?,?,?,?)";
  const preOrderData = [
    email,
    productName,
    productDetails,
    productType,
    brand,
    qty,
    "0",
    phoneNumber,
  ];

  return PromiseModule.createUpdateDelete(sqlQuery, preOrderData);
}

async function pandingPreOrders(email) {
  const sqlQuery = `SELECT * from preorder where user_email = '${email}' and status = '0' ORDER by order_date DESC`;
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
  const sqlSearch = `Select * from preorder`;
  return PromiseModule.readData(sqlSearch);
}

async function deletePreOrderById(id) {
  const sqlQuery = `DELETE FROM preorder WHERE id = (?)`;
  return PromiseModule.createUpdateDelete(sqlQuery, [id]);
}
module.exports = orderQuerry;

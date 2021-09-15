const PromiseModule = require("../../helpers/Promise/PromiseModule");

const Shipping = {
  getShippingDetails,
  getShippingClass,
  addShippingClass,
  deleteShippingClassById,
  updateShippingClassById,
};

async function getShippingDetails(id) {
  const sqlSearch = `Select * from product_shipping,shipping where product_shipping.product_id = ${id} and shipping.shipping_class_id = product_shipping.shipping_id`;
  return PromiseModule.readData(sqlSearch);
}

async function getShippingClass() {
  const sqlSearch = `Select * from shipping ORDER BY shipping.shipping_class_id ASC`;
  return PromiseModule.readData(sqlSearch);
}

async function addShippingClass(shippingClassData) {
  const sqlInsert = `Insert into shipping (shipping_class_name,shipping_type,shipping_zone,shipping_rate) values  ?`;
  return PromiseModule.createUpdateDelete(sqlInsert, shippingClassData);
}

async function deleteShippingClassById(id) {
  const sqlDelete = `Delete from shipping where shipping_class_id = ?`;
  return PromiseModule.createUpdateDelete(sqlDelete, [id]);
}

async function updateShippingClassById(shippingClassUpdatedData) {
    const sqlUpdate = `Update shipping set shipping_class_name = ?,shipping_type=?,shipping_zone=?,shipping_rate = ? where shipping_class_id = ?`
    return PromiseModule.createUpdateDelete(sqlUpdate,shippingClassUpdatedData)
}

module.exports = Shipping;

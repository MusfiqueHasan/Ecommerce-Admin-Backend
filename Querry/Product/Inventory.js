const PromiseModule = require("../../helpers/Promise/PromiseModule");

const INCREASED = 1;
const DECREASED = 2;
const NEUTRAL = 0;

const Inventory = {
  addInventory,
  getInventoryById,
  updateInventory,
  updateStockStatus,
};
async function addInventory(inventoryData) {
  const sqlInsert =
    "Insert into prduct_inventory (product_id,allowBackOrders,quantity,stock_threshold,inserted_at, updated_at) values ?";
  return PromiseModule.createUpdateDelete(sqlInsert, inventoryData);
}

async function updateInventory(ordersItem, stockType) {
  let query = "";

  console.log(ordersItem);
  if (stockType === DECREASED) {
    ordersItem.map(
      item =>
        (query += `UPDATE prduct_inventory SET quantity= quantity - ${item.qty} WHERE product_id = ${item.productId};`)
    );
  } else {
    ordersItem.map(
      item =>
        (query += `UPDATE prduct_inventory SET quantity= quantity + ${item.qty} WHERE product_id = ${item.productId};`)
    );
  }
  // ordersItem.map(
  //   item =>
  //     (query =
  //       query + stockType === DECREASED
  //         ? `UPDATE prduct_inventory SET quantity= quantity - ${item.qty} WHERE product_id = ${item.productId}; `
  //         : `UPDATE prduct_inventory SET quantity= quantity + ${item.qty} WHERE product_id = ${item.productId}; `)
  // );
  console.log(query);
  return PromiseModule.readData(query);
}
async function updateStockStatus(ordersItem) {
  let query = "";
  ordersItem.map(
    item =>
      (query += `UPDATE product,prduct_inventory SET product.inventory_status = IF (prduct_inventory.quantity > 0 , 'In Stock','Out Of Stock') WHERE product.product_id = ${item.productId} AND product.product_id = prduct_inventory.product_id; `)
  );
  return PromiseModule.readData(query);
}

async function getInventoryById(id) {
  const sqlSearch = `Select * from prduct_inventory where prduct_inventory.product_id = ${id}`;
  console.log(sqlSearch);
  return PromiseModule.readData(sqlSearch);
}

module.exports = Inventory;

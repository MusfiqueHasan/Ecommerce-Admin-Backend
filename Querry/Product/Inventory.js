const PromiseModule = require("../../helpers/Promise/PromiseModule");

const INCREASED = 1;
const DECREASED = 2;
const NEUTRAL = 0;

const Inventory = {
  addInventory,
  getInventoryById,
  updateInventory,
  updateStockStatus,
  getParentProductInventory,
  updateStock,
  removeInventory,
  getVariationsInventory,
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

async function getParentProductInventory() {
  const sqlSearch = `SELECT p.product_id,p.manageStock,p.slug,p.inventory_status,pd.product_name,pi.allowBackOrders,pi.quantity,pi.stock_threshold FROM product as p INNER JOIN product_details as pd ON p.product_id = pd.product_id LEFT JOIN prduct_inventory as pi on pi.product_id = p.product_id ORDER BY p.product_id DESC`;
  return PromiseModule.readData(sqlSearch);
}

async function getVariationsInventory(parentId) {
  const sqlSearch = `SELECT p.product_id,p.manageStock,p.slug,p.inventory_status,pi.allowBackOrders,pi.quantity,pi.stock_threshold,product_variants.product_variant_combinations FROM product as p INNER JOIN product_variants on product_variants.product_variant_id = p.product_id  And p.parent_id = ${parentId}  LEFT JOIN prduct_inventory as pi on pi.product_id = p.product_id `;
  return PromiseModule.readData(sqlSearch);
}

async function updateStock(stockData) {
  const sqlUpdate = `Update prduct_inventory Set quantity=?,allowBackOrders=?,stock_threshold=? where product_id = ?`;
  return PromiseModule.createUpdateDelete(sqlUpdate, stockData);
}

async function removeInventory(id) {
  const sqlDelete = `Delete from prduct_inventory where product_id = ?`;
  console.log(id);
  return PromiseModule.createUpdateDelete(sqlDelete, id);
}

module.exports = Inventory;

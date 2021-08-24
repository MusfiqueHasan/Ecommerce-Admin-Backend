const PromiseModule = require("../../helpers/Promise/PromiseModule");

const Inventory = {
  addInventory,
  getInventoryById
};
async function addInventory(inventoryData) {
  const sqlInsert =
    "Insert into prduct_inventory (product_id,allowBackOrders,quantity,stock_threshold,inserted_at, updated_at) values ?";
  return PromiseModule.createUpdateDelete(sqlInsert, inventoryData);
}

async function updateInventory(quantity, inventory_id) {
  const sqlUpdate =
    "Update product_inventory Set quantity = ? where inventory_id = ?";
  const data = [quantity, inventory_id];
  return PromiseModule.createUpdateDelete(sqlUpdate, data);
}

async function getInventoryById(id){
  const sqlSearch = `Select * from prduct_inventory where prduct_inventory.product_id = ${id}`
  console.log(sqlSearch)
  return PromiseModule.readData(sqlSearch)
}

module.exports = Inventory;

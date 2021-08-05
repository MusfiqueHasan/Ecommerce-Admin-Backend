const PromiseModule = require("../../dbModel/Promise/PromiseModule");

const Inventory = {
  addInventory
};
async function addInventory(inventoryData) {
  const sqlInsert =
    "Insert into prduct_inventory (product_id,inventory_status,quantity,stock_threshold,inserted_at, updated_at) values ?";
  return PromiseModule.createUpdateDelete(sqlInsert, inventoryData);
}

async function updateInventory(quantity, inventory_id) {
  const sqlUpdate =
    "Update product_inventory Set quantity = ? where inventory_id = ?";
  const data = [quantity, inventory_id];
  return PromiseModule.createUpdateDelete(sqlUpdate, data);
}

module.exports = Inventory;

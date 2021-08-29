const express = require("express");
const InventoryQuery = require("../../../Querry/Product/Inventory");
const ProductsQuery = require("../../../Querry/Product/Products");
const Utils = require("../../../Utils/Utils");
const routes = express.Router();

routes.get("/inventories", async (req, res) => {
  try {
    const response = await InventoryQuery.getParentProductInventory();
    const jsonObject = {
      massage: "success",
      results: [...response],
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Internal Server Error!" });
  }
});

routes.patch("/inventories/:id", async (req, res) => {
  const { id } = req.params;
  const manageStock = req.body.data.manageStock;
  const previousManageStock = req.body.data.previousManageStock;
  const inventory_status = req.body.data.inventory_status;
  const allowBackOrders = req.body.data.allowBackOrders;
  const quantity = req.body.data.quantity;
  const stock_threshold = req.body.data.stock_threshold;
  if (manageStock === true && allowBackOrders === null)
    return res.status(404).json({ massage: "Select Back Orders Type" });
  if (manageStock === true && quantity === null)
    return res.status(404).json({ massage: "Stock Amount Empty" });
  if (manageStock === true && stock_threshold === null)
    return res.status(404).json({ massage: "Stock Threshold Empty" });
  try {
    if (previousManageStock === 1 && manageStock === false) {
      await InventoryQuery.removeInventory(id);
    } else if (previousManageStock === 0 && manageStock === true) {
      const inventoryData = [
        [
          id,
          allowBackOrders,
          quantity,
          stock_threshold,
          Utils.getTimeStamp(),
          Utils.getTimeStamp(),
        ],
      ];
      await InventoryQuery.addInventory([inventoryData]);
    } else {
      const stockUpdateData = [quantity, allowBackOrders, stock_threshold, id];
      await InventoryQuery.updateStock(stockUpdateData);
    }
    const updatedData = [manageStock, inventory_status, id];
    console.log(updatedData);
    await ProductsQuery.updateProductManageStockStatus(updatedData);

    res.status(200).json({
      massage: "Success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Internal Server Error!" });
  }
});

module.exports = routes;

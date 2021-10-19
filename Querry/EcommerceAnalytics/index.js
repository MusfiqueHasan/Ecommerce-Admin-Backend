const PromiseModule = require("../../helpers/Promise/PromiseModule");

const EcommerceAnalyticsQuery = {
  getInventoryStatistice,
};

async function getInventoryStatistice() {
  const sqlSearch = `SELECT inventory_status, COUNT(inventory_status) as count from product GROUP BY inventory_status`;
  return PromiseModule.readData(sqlSearch);
}

module.exports = EcommerceAnalyticsQuery
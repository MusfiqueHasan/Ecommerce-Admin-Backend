const PromiseModule = require("../../helpers/Promise/PromiseModule");

const MarketingQuery = {
  addPixel,
  getPixel,
  updatePixel,
};

async function addPixel(pixelData) {
  const sqlInsert = `Insert into pixel (id,description) values (?,?)`;
  return PromiseModule.createUpdateDelete(sqlInsert, pixelData);
}

async function getPixel() {
  const sqlSearch = `Select * from pixel`;
  return PromiseModule.readData(sqlSearch);
}

async function updatePixel(updatedPixelCode) {
  const sqlUpdate = `Update pixel set description = ? where id = 1`;
  return PromiseModule.createUpdateDelete(sqlUpdate, [updatedPixelCode]);
}

module.exports = MarketingQuery;

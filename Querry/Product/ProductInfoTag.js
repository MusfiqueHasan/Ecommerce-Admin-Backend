const PromiseModule = require("../../helpers/Promise/PromiseModule");

const Tags = {
  addGeneratedTags,
  getGeneratedTags,
  getGeneratedTagsById,
  removeGeneratedTagsById,
};

async function addGeneratedTags(data) {
  const sqlInsert = `Insert into product_price_info_tags (tag_name,tag_descriptions,inserted_at,updated_at) values (?,?,?,?)`;

  return PromiseModule.createUpdateDelete(sqlInsert, data);
}

async function getGeneratedTags() {
  const sqlSearch = `Select * from product_price_info_tags ORDER BY product_price_info_tags.prduct_info_price_tag_id DESC`;

  return PromiseModule.readData(sqlSearch);
}
async function getGeneratedTagsById(id) {
  const sqlSearch = `Select * from product_price_info_tags where prduct_info_price_tag_id=${id}`;
  return PromiseModule.readData(sqlSearch);
}
async function removeGeneratedTagsById(id) {
  const sqlDelete = `Delete from product_price_info_tags where prduct_info_price_tag_id= ?`;
  return PromiseModule.createUpdateDelete(sqlDelete, [id]);
}
module.exports = Tags;

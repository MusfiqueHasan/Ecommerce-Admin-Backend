const PromiseModule = require("../../dbModel/Promise/PromiseModule");
const Categories = {
  getCategories,
  addCategories,
  removeACategory,
};

async function getCategories() {
  const sqlSearch =
    "Select categories.category_id,name,description,parent_id,pc.count  From categories LEFT JOIN (SELECT category_id, COUNT( category_id) as count from product_categories GROUP By category_id ) as pc on pc.category_id = categories.category_id";
  return PromiseModule.readData(sqlSearch);
}

async function addCategories(
  name,
  parent_id,
  description,
  inserted_at,
  updated_at
) {
  const sqlInsert =
    "Insert Into categories (name,parent_id,inserted_at,updated_at,description) VALUES (?,?,?,?,?)";

  const categoryData = [name, parent_id, inserted_at, updated_at, description];
  return PromiseModule.createUpdateDelete(sqlInsert, categoryData);
}

async function removeACategory(category_id) {
  const sqlDelete = "Delete From categories where category_id = ?";

  const deleted_data = [category_id];
  return PromiseModule.createUpdateDelete(sqlDelete, deleted_data);
}

module.exports = Categories;

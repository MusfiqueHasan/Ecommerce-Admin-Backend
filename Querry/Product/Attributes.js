const PromiseModule = require("../../helpers/Promise/PromiseModule");

const Attributes = {
  getAttributes,
  addAttribute,
  removeAttribute,
  getAttributesById
};

async function getAttributes() {
  const sqlSearch =
    "Select attributes.attribute_id,attributes.attribute_name,options.option_name, options.option_id From attributes Left Join options On options.attribute_id = attributes.attribute_id order by attributes.attribute_id asc";
  return PromiseModule.readData(sqlSearch);
}


async function getAttributesById(id) {
  console.log(id)
  const sqlSearch =
    `SELECT a.attribute_id,a.attribute_name,op.option_name, op.option_id from product_attribute INNER JOIN (Select attributes.attribute_id,attributes.attribute_name From attributes )as a on a.attribute_id = product_attribute.attribute_id Inner Join (SELECT options.option_name,options.option_id,product_options.product_id FROM options INNER JOIN product_options on product_options.option_id = options.option_id) as op on op.product_id = product_attribute.product_id AND product_attribute.product_id = ${id} ORDER BY a.attribute_id ASC`;
  return PromiseModule.readData(sqlSearch);
}
async function addAttribute(attribute_name, inserted_at, updated_at) {
  const sqlInsert =
    "Insert into attributes (attribute_name, inserted_at, updated_at) values (?,?,?)";
  const attributeData = [attribute_name, inserted_at, updated_at];
  console.log(attributeData);
  return PromiseModule.createUpdateDelete(sqlInsert, attributeData);
}

async function removeAttribute(attribute_id) {
  const sqlDelete = `DELETE  attributes,options FROM attributes LEFT JOIN options on options.attribute_id = attributes.attribute_id WHERE attributes.attribute_id = ?`;

  const deleted_data = [attribute_id];
  return PromiseModule.createUpdateDelete(sqlDelete, deleted_data);
}

module.exports = Attributes;


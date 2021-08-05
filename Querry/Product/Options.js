const PromiseModule = require("../../dbModel/Promise/PromiseModule");

const Options = {
  getOptions,
  addOption,
  removeOption
};

// sql query to get all data
async function getOptions() {
  const sqlSearch = "Select option_id,attribute_id,option_name From options";
  return PromiseModule.readData(sqlSearch);
}

// sql query to add data
async function addOption(attribute_id, option_name, inserted_at, updated_at) {
  const sqlInsert =
    "Insert into options (attribute_id,option_name, inserted_at, updated_at) values (?,?,?,?)";
  const optionData = [attribute_id, option_name, inserted_at, updated_at];

  return PromiseModule.createUpdateDelete(sqlInsert, optionData);
}

// sql query to remove option
async function removeOption(option_id) {
  const sqlDelete = "Delete From options where option_id = ?";

  const deleted_data = [option_id];
  return PromiseModule.createUpdateDelete(sqlDelete, deleted_data);
}

module.exports = Options;

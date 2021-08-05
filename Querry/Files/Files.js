const PromiseModule = require('../../dbModel/Promise/PromiseModule')
const Files = {
  insertFile
};

async function insertFile(file_name, mime_type, inserted_at,size) {
  const sqlInsert =
    "Insert Into files (file_name,mime_type,inserted_at,size) Values(?,?,?,?)";
  const file_data = [file_name, mime_type, inserted_at,size]
  return PromiseModule.createUpdateDelete(sqlInsert, file_data)
}

module.exports = Files;

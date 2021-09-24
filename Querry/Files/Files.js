const PromiseModule = require("../../helpers/Promise/PromiseModule");
const Files = {
  insertFile,
  getFiles,
  removeFile
};

async function insertFile(file_name, mime_type, inserted_at, size) {
  const sqlInsert =
    "Insert Into files (file_name,mime_type,inserted_at,size) Values(?,?,?,?)";
  const file_data = [file_name, mime_type, inserted_at, size];
  return PromiseModule.createUpdateDelete(sqlInsert, file_data);
}

async function getFiles() {
  const sqlSearch = `Select * from files ORDER BY files.file_id DESC`;
  return PromiseModule.readData(sqlSearch);
}
async function removeFile(id){
  const sqlDelete = `DELETE FROM files WHERE file_id = ?`
  return PromiseModule.createUpdateDelete(sqlDelete,[id])
}
module.exports = Files;

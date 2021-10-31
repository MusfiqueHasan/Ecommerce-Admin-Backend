const PromiseModule = require("../../helpers/Promise/PromiseModule");

const permissionQuery = {
    getAllPermissionData,
    getPermissionDataById,
    createAPermission,
    updateAPermission,
    deleteAPermission,
};

async function getAllPermissionData () {
    const sqlQuery = `SELECT * FROM permission ORDER BY id DESC`;
    return PromiseModule.readData(sqlQuery);
};

async function getPermissionDataById (id) {
    const sqlQuery = `SELECT * FROM permission WHERE user_id = '${id}'`;
    return PromiseModule.readData(sqlQuery);
}

async function createAPermission (inputArray) {
    const sqlQuery = `INSERT INTO permission (user_id, routing_id, read_operation, update_operation, delete_operation) Values (?)`;
    return PromiseModule.createUpdateDelete(sqlQuery, inputArray);
}

async function updateAPermission (inputArray) {
    const sqlQuery = `UPDATE permission SET user_id = ?, routing_id = ?, read_operation = ? , update_operation = ? , delete_operation = ? WHERE id = ?`;
    return PromiseModule.createUpdateDelete(sqlQuery, inputArray);
}

async function deleteAPermission (inputData) {
    const sqlQuery = `DELETE FROM permission WHERE id = ?`;
    const inputArray = [inputData];
    return PromiseModule.createUpdateDelete(sqlQuery,inputArray);
}

module.exports = permissionQuery;
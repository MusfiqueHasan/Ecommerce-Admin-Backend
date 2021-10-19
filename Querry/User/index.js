const PromiseModule = require("../../helpers/Promise/PromiseModule");

const UserQuery = {
  getUsers,
  getUsersById
};

async function getUsers() {
  const sqlSearch = `Select * from user_info ORDER BY user_info.id DESC`;
  return PromiseModule.readData(sqlSearch);
}

async function getUsersById(id) {
    const sqlSearch = `Select * from user_info where id =${id}`;
    return PromiseModule.readData(sqlSearch);
  }
  
module.exports = UserQuery;

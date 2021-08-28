const UserModel = user => {
  const userInfo = user;
  delete userInfo.password;
  delete userInfo.updated_date;
  return userInfo;
};

module.exports = {UserModel}

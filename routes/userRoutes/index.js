const express = require("express");
const { UserModel } = require("../../Modles/Users");
const routes = express.Router();
const UserQuery = require("../../Querry/User");
const { getUserInfo } = require("../../Querry/userQuerry/userinfoQuerry");
const Utils = require("../../Utils/Utils");

routes.get("/users", async (req, res) => {
  try {
    const response = await UserQuery.getUsers();
    const jsonObject = {
      massage: "Success",
      total_user: response.length,
      results: response.map(user => UserModel(user)),
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Internal Server Error!" });
  }
});

routes.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  if (!Utils.isIdValid(id))
    return res.status(404).json({ massage: "User is not found" });
  try {
    const response = await getUserInfo(id);
    if (response.length === 0)
      return res.status(404).json({ massage: "User is not found" });

    const jsonObject = {
      massage: "Success",
      total_user: response.length,
      results: [UserModel(response[0])],
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Internal Server Error!" });
  }
});

module.exports = routes;

const express = require("express");
const routes = express.Router();
const Categories = require("../../../dbModel/Product/Categories");
const Utils = require("../../../Utils/Utils");

routes.post("/add-category", async (req, res) => {
  const { categoryData } = req.body;
  const { name, description, parent_id } = categoryData;
  try {
    const inserted_at = Utils.getTimeStamp();
    const response = await Categories.addCategories(
      name,
      parent_id,
      description,
      inserted_at,
      inserted_at
    );
    const jsonData = {
      category_id: response.insertId,
      name: name,
      description: description,
      parent_id: parent_id
    };
    return res.status(200).json(jsonData);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Something Went Wrong" });
  }
});

routes.get("/categories", async (req, res) => {
  try {
    const response = await Categories.getCategories();
    return res.status(200).json({
      status: "success",
      data: {
        total_categories: response.length,
        categories: [...response]
      }
    });
  } catch (error) {
    return res.status(400).json({ msg: "Something Went Wrong" });
  }
});

routes.post("/remove-a-category", async (req, res) => {
  try {
    const { category_id } = req.body;
    const response = await Categories.removeACategory(category_id);
    return res.status(200).json({
      status: "success",
      msg: "Successfully remove item"
    });
  } catch (error) {
    return res.status(400).json({ msg: "Something Went Wrong" });
  }
});

module.exports = routes;

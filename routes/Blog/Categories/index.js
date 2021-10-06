const express = require("express");
const routes = express.Router();
const HTTPStatus = require("../../../HTTPStatus");
const { NewCategoryModel } = require("../../../Modles/Category");
const BlogQuerry = require("../../../Querry/BlogQuerry/CategoryQuerry");
const { getTimeStamp } = require("../../../Utils/Utils");

routes.get("/categories", async (req, res) => {
  try {
    const response = await BlogQuerry.getAllCategories();
    const categories = response.map(item => {
      return {
        category_id: item.category_id,
        name: item.category_name,
        description: item.description,
        parent_id: item.parent_category,
      }
    })
    const jsonObject = {
      massage: "success",
      results: categories,
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "INTERNAL SERVER ERROR" });
  }
});

routes.post("/categories", async (req, res) => {
  const { name, description, parent_id } = req.body.categoryData;

  const parent_category = parent_id ? parent_id : null;
  const category_name = name;
  const updated_at = getTimeStamp();
  const inserted_at = getTimeStamp();

  if (!description) {
    description = "";
  }

  const newCategoryArray = [
    category_name,
    parent_category,
    updated_at,
    inserted_at,
    description,
  ];
  const inputArray = [newCategoryArray];

  try {
    const response = await BlogQuerry.createNewCategory([inputArray]);
    const jsonData = {
      category_id: response.insertId,
      name: category_name,
      description: description,
      parent_id: parent_category,
    };
    res.status(HTTPStatus.OK).json(jsonData);
  } catch (error) {
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "INTERNAL SERVER ERROR" });
  }
});

routes.patch("/categories/:id", async (req, res) => {
  const { id } = req.params;
  const { name, parent_id } = req.body.categoryData;

  const parent_category = parent_id ? parent_id : null;
  const category_name = name;
  const updated_at = getTimeStamp();
  const inserted_at = getTimeStamp();
  const category_id = id;

  const description = req.body.categoryData.description || "";
  if (!category_id) {
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ massage: "category id not found" });
  }

  const newCategoryArray = [
    category_name,
    parent_category,
    updated_at,
    description,
    category_id,
  ];
  try {
    const response = await BlogQuerry.updateCategory(newCategoryArray);

    res.status(HTTPStatus.OK).json({ status: "success" });
  } catch (error) {
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "INTERNAL SERVER ERROR" });
  }
});

routes.delete("/categories/:id", async (req, res) => {
  const { id } = req.params;

  const category_id = id;

  if (!category_id) {
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ massage: "category id not found" });
  }

  try {
    const response = await BlogQuerry.deleteCategory(category_id);
    res.status(HTTPStatus.OK).json({ massage: "success" });
  } catch (error) {
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "INTERNAL SERVER ERROR" });
  }
});
module.exports = routes;

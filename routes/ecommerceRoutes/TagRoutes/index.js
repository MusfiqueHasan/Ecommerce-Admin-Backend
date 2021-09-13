const express = require("express");
const HTTPStatus = require("../../../HTTPStatus");
const TagQuery = require("../../../Querry/Product/ProductInfoTag");
const routes = express.Router();
const Utils = require("../../../Utils/Utils");

routes.get("/tags", async (req, res) => {
  try {
    const response = await TagQuery.getGeneratedTags();
    const jsonObject = {
      massage: "Success",
      results: [...response],
    };
    res.status(HTTPStatus.CREATED).json(jsonObject);
  } catch (error) {
    console.log(error);

    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error!" });
  }
});

routes.get("/tags/:id", async (req, res) => {
  const { id } = req.params;
  if (!Utils.isIdValid(id))
    return res.status(404).json({ massage: "Tag is not found" });

  try {
    const response = await TagQuery.getGeneratedTagsById(id);
    const jsonObject = {
      massage: "Success",
      results: {
        ...response[0],
      },
    };
    res.status(HTTPStatus.CREATED).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error!" });
  }
});

routes.delete("/tags/:id", async (req, res) => {
  const { id } = req.params;
  if (!Utils.isIdValid(id))
    return res.status(404).json({ massage: "Tag is not found" });

  try {
    const response = await TagQuery.removeGeneratedTagsById(id);
    const jsonObject = {
      massage: "Success",
    };
    res.status(HTTPStatus.CREATED).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error!" });
  }
});

routes.post("/tag", async (req, res) => {
  const tag_name = req.body.tag_name;
  const tag_descriptions = req.body.tag_descriptions;
  const inserted_at = req.body.inserted_at || Utils.getTimeStamp();
  const updated_at = req.body.updated_at || Utils.getTimeStamp();

  if (!tag_name || tag_name.length === 0)
    return res.status(400).json({ massage: "Tag name is required" });

  try {
    const results = await TagQuery.addGeneratedTags([
      tag_name,
      tag_descriptions,
      inserted_at,
      updated_at,
    ]);
    const jsonObject = {
      massage: "Success",
    };
    res.status(HTTPStatus.CREATED).json(jsonObject);
  } catch (error) {
    console.log(error);

    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error!" });
  }
});

module.exports = routes;

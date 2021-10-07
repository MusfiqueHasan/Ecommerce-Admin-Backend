const express = require("express");
const HTTPStatus = require("../../../HTTPStatus");
const MarketingQuery = require("../../../Querry/Marketing");
const routes = express.Router();

routes.get("/fb-pixel", async (req, res) => {
  try {
    const response = await MarketingQuery.getPixel();
    const jsonObject = {
      massage: "Success",
      ...response[0],
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error!" });
  }
});

routes.patch("/fb-pixel", async (req, res) => {
  const description = req.body.description;
  try {
    const response = MarketingQuery.updatePixel(description);
    const jsonObject = {
      massage: "Updated",
    };

    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error!" });
  }
});

module.exports = routes;

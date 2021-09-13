const express = require("express");
const HTTPStatus = require("../../../HTTPStatus");
const ShippingQuery = require("../../../Querry/Product/Shipping");
const routes = express.Router();

//get all shipping class
routes.get("/shipping", async (req, res) => {
  try {
    const response = await ShippingQuery.getShippingClass();
    const jsonObject = {
      massage: "Success",
      results: [...response],
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error" });
  }
});

//add shipping class
routes.post("/shipping", async (req, res) => {});

//update shipping class
routes.patch("/shipping", async (req, res) => {});

//delete shipping class
routes.delete("/shipping", async (req, res) => {});

module.exports = routes;

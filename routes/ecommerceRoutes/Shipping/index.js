const express = require("express");
const HTTPStatus = require("../../../HTTPStatus");
const { ShippingClassModel } = require("../../../Modles/Shipping");
const ShippingQuery = require("../../../Querry/Product/Shipping");
const Utils = require("../../../Utils/Utils");
const routes = express.Router();

//get all shipping class
routes.get("/shipping", async (req, res) => {
  try {
    const response = await ShippingQuery.getShippingClass();
    const jsonObject = {
      massage: "Success",
      results: response.map(item => ShippingClassModel(item)).reverse(),
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error" });
  }
});

//add shipping class
routes.post("/shipping", async (req, res) => {
  const shipping_class_name = req.body.shipping_name;
  const shipping_type = req.body.shipping_type;
  const shipping_zone = req.body.shipping_zone;
  const shipping_rate = req.body.shipping_rate;

  if (!shipping_class_name || shipping_class_name.trim().length === 0)
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ massage: "Shipping Class Name Empty" });

  try {
    const shippingClassData = [
      [
        shipping_class_name,
        shipping_type,
        JSON.stringify(shipping_zone),
        shipping_rate,
      ],
    ];

    const response = await ShippingQuery.addShippingClass([shippingClassData]);
    const jsonObject = {
      massage: "Success",
      results: {
        shipping_class_id: response.insertId,
      },
    };
    res.status(HTTPStatus.CREATED).json(jsonObject);
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error" });
  }
});

//update shipping class
routes.patch("/shipping/:id", async (req, res) => {
  const { id } = req.params;
  if (!Utils.isIdValid(id))
    return res
      .status(HTTPStatus.NOT_FOUND)
      .json({ massage: "Shipping Class is not found" });
  const shipping_class_name = req.body.shipping_name;
  const shipping_type = req.body.shipping_type;
  const shipping_zone = req.body.shipping_zone;
  const shipping_rate = req.body.shipping_rate;

  if (!shipping_class_name || shipping_class_name.trim().length === 0)
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ massage: "Shipping Class Name Empty" });

  try {
    const shippingClassData = [
      shipping_class_name,
      shipping_type,
      JSON.stringify(shipping_zone),
      shipping_rate,
      id,
    ];

    const response = await ShippingQuery.updateShippingClassById(
      shippingClassData
    );
    const jsonObject = {
      massage: "Updated",
      results: {
        shipping_class_id: id,
        shipping_class_name: shipping_class_name,
        shipping_type: shipping_type,
        shipping_zone: shipping_zone,
        shipping_rate: shipping_rate,
      },
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error" });
  }
});

//delete shipping class
routes.delete("/shipping/:id", async (req, res) => {
  const { id } = req.params;
  if (!Utils.isIdValid(id))
    return res
      .status(HTTPStatus.NOT_FOUND)
      .json({ massage: "Shipping Class is not found" });
  try {
    const response = await ShippingQuery.deleteShippingClassById(id);
    if (response.affectedRows === 0)
      return res
        .status(HTTPStatus.NOT_FOUND)
        .json({ massage: "Shipping Class is not found" });
    const jsonObject = {
      massage: "Success",
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error" });
  }
});

module.exports = routes;

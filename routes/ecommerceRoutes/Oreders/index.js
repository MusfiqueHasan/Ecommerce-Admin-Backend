const express = require("express");
const PromiseModule = require("../../../helpers/Promise/PromiseModule");
const HTTPStatus = require("../../../HTTPStatus");
const routes = express.Router();
const OrderQuery = require("../../../Querry/ecommerceQuery/orderQuerry");
const InventoryQuery = require("../../../Querry/Product/Inventory");
const Utils = require("../../../Utils/Utils");

const INCREASED = 1;
const DECREASED = 2;
const NEUTRAL = 0;
routes.get("/orders", async (req, res) => {
  try {
    const response = await OrderQuery.getAllOrders();
    const jsonObject = {
      massage: "Success",
      results: [...response],
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: error.massage });
  }
});

routes.get("/orders/:id", async (req, res) => {
  const { id } = req.params;

  if (!Utils.isIdValid(id))
    return res.status(404).json({ massage: "Order is not found" });
  try {
    const orderUserInformation = await OrderQuery.getUserInformationOfUser(id);
    if (orderUserInformation.length === 0)
      return res.status(404).json({ massage: "Order is not found" });
    const orderInformation = await OrderQuery.getOrderInformationById(id);
    const jsonObject = {
      massage: "Success",
      results: {
        ...orderUserInformation[0],
        orderedItems: [...orderInformation],
      },
    };

    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: error.massage });
  }
});

routes.patch("/orders/:id", async (req, res) => {
  const { id } = req.params;

  const order_status = req.body.order_status || null;
  const orders = req.body.orders;
  const html = req.body.html;
  const previous_status = req.body.previous_status;

  const increasedQuantity = ["Completed", "Processing", "Pending Payment"];
  const decreasedQuantity = ["On hold", "Cancelled", "Failed", "Refund"];

  let quantityTypeStatus = NEUTRAL;

  if (
    increasedQuantity.findIndex(value => value === order_status) > -1 &&
    decreasedQuantity.findIndex(value => value === previous_status) > -1
  ) {
    quantityTypeStatus = DECREASED;
  } else if (
    increasedQuantity.findIndex(value => value === previous_status) > -1 &&
    decreasedQuantity.findIndex(value => value === order_status) > -1
  ) {
    quantityTypeStatus = INCREASED;
  } else {
    quantityTypeStatus = NEUTRAL;
  }

  if (!Utils.isIdValid(id))
    return res.status(404).json({ massage: "Order is not found" });

  if (!order_status)
    return res.status(404).json({ massage: "Order status is empty" });

  if (orders.length === 0)
    return res.status(404).json({ massage: "Order item is empty" });
  const mailOptions = {
    to: "ratulbhowmick66@gmail.com",
    subject: "Hello World",
    html: html,
    text: "TEST MAIL BODY",
  };
  try {
    const response = await OrderQuery.updateOrderStatus(id, order_status);
    quantityTypeStatus !== NEUTRAL &&
      (await InventoryQuery.updateInventory(orders, quantityTypeStatus));

    await InventoryQuery.updateStockStatus(orders);
    // await PromiseModule.sendMail(mailOptions);
    const jsonObject = {
      massage: "Success Updated!",
    };

    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error!" });
  }
});

routes.get("/pre-orders", async (req, res) => {
  try {
    const response = await OrderQuery.getAllPreOrders();
    const jsonObject = {
      massage: "Success",
      results: [...response],
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error!" });
  }
});

routes.patch("/pre-orders/:id", async (req, res) => {
  const { id } = req.params;

  const order_status = req.body.status || null;

  if (!Utils.isIdValid(id))
    return res.status(404).json({ massage: "Order is not found" });

  if (!order_status)
    return res.status(404).json({ massage: "Order status is empty" });

  try {
    const response = await OrderQuery.updatePreOrderStatus(id, order_status);
    const jsonObject = {
      massage: "Success Updated!",
    };

    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error!" });
  }
});

routes.delete("/pre-orders/:id", async (req, res) => {
  const { id } = req.params;

  if (!Utils.isIdValid(id))
    return res.status(404).json({ massage: "Order is not found" });

  try {
    const response = await OrderQuery.deletePreOrderById(id);
    const jsonObject = {
      massage: "Success Updated!",
    };

    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error!" });
  }
});

routes.get("/order-type", async (req, res) => {
  try {
    const response = await OrderQuery.getAllOrderType();
    const ordertypes = response.map(item => {
      return {
        value: item.order_type_id,
        label: item.order_type_name,
        inserted_at: item.inserted_at,
        updated_at: item.updated_at
      }
    })
    const jsonObject = {
      massage: "success",
      results: ordertypes,
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
      res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({massage : "INTERNAL_SERVER_ERROR"});
  }
})

routes.post("/order-type", async (req, res) => {
  const order_type_name = req.body.order_type_name;
  const inserted_at = Utils.getTimeStamp();

  if (order_type_name === "From website") {
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ massage: "Order type name is invalid" });
  }

  const newOrderTypeArray = [
    order_type_name,
    inserted_at,
  ];

  const inputArray = [newOrderTypeArray];

  try {
    const response = await OrderQuery.addOrderType([inputArray]);
    const jsonData = {
      order_type_id: response.insertId,
      order_type_name: order_type_name,
    };
    res.status(HTTPStatus.OK).json(jsonData);
  } catch (error) {
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "INTERNAL SERVER ERROR" });
  }
});

routes.patch("/order-type/:id", async (req, res) => {
  const { id } = req.params;
  const order_type_name = req.body.order_type_name;
  const updated_at = Utils.getTimeStamp();
  const inserted_at = Utils.getTimeStamp();
  const order_type_id = id;

  if (!order_type_id) {
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ massage: "Order type id not found" });
  }

  if (order_type_id === "1" && order_type_name === "From website") {
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ massage: "This order type is not editable" });
  }

  const newOrderTypeArray = [
    order_type_name,
    updated_at,
    order_type_id,
  ];
  try {
    const response = await OrderQuery.updateOrderType(newOrderTypeArray);

    res.status(HTTPStatus.OK).json({ status: "success" });
  } catch (error) {
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "INTERNAL SERVER ERROR" });
  }
});

routes.delete("/order-type/:id", async (req, res) => {
  const { id } = req.params;

  const order_type_id = id;

  if (!order_type_id) {
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ massage: "Order type id not found" });
  }

  if (order_type_id === "1" && order_type_name === "From website") {
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ massage: "You can not delete this order type" });
  }

  try {
    const response = await OrderQuery.deleteOrderType(order_type_id);
    res.status(HTTPStatus.OK).json({ massage: "success" });
  } catch (error) {
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "INTERNAL SERVER ERROR" });
  }
});

module.exports = routes;

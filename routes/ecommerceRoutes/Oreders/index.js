const express = require("express");
const PromiseModule = require("../../../helpers/Promise/PromiseModule");
const routes = express.Router();
const OrderQuery = require("../../../Querry/ecommerceQuery/orderQuerry");
const Utils = require("../../../Utils/Utils");

routes.get("/orders", async (req, res) => {
  try {
    const response = await OrderQuery.getAllOrders();
    const jsonObject = {
      massage: "Success",
      results: [...response],
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: error.massage });
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

    res.status(200).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: error.massage });
  }
});

routes.patch("/orders/:id", async (req, res) => {
  const { id } = req.params;

  const order_status = req.body.order_status || null;
  const html = req.body.html;
  console.log(html);
  if (!Utils.isIdValid(id))
    return res.status(404).json({ massage: "Order is not found" });

  if (!order_status)
    return res.status(404).json({ massage: "Order status is empty" });

  const mailOptions = {
    to: "ratulbhowmick66@gmail.com",
    subject: "Hello World",
    html: html,
    text: "TEST MAIL BODY",
  };
  try {
    console.log(order_status);
    const response = await OrderQuery.updateOrderStatus(id, order_status);
    await PromiseModule.sendMail(mailOptions);
    const jsonObject = {
      massage: "Success Updated!",
    };

    res.status(200).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Internal Server Error!" });
  }
});

routes.get("/pre-orders", async (req, res) => {
  try {
    const response = await OrderQuery.getAllPreOrders();
    const jsonObject = {
      massage: "Success",
      results: [...response],
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    res.status(500).json({ massage: "Internal Server Error!" });
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

    res.status(200).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Internal Server Error!" });
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

    res.status(200).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Internal Server Error!" });
  }
});

module.exports = routes;

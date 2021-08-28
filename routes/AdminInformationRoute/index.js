const express = require("express");
const AdminInfoQuery = require("../../Querry/AdminInfo");
const routes = express.Router();
const Utils = require("../../Utils/Utils");

routes.get("/admin-info", async (req, res) => {
  try {
    const adminInfoResponse = await AdminInfoQuery.getAdminInfo();
    const paymentInfo = await AdminInfoQuery.getPaymentDetails();

    console.log(adminInfoResponse);
    const jsonObject = {
      massage: "Success",
      results: {
        info: { ...adminInfoResponse[0] },
        paymentDetails: [...paymentInfo],
      },
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    res.status(500).json({ massage: "Internal Server Error!" });
  }
});

routes.patch("/admin-info/general", async (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  const address = req.body.address;
  const contact_no = req.body.contact_no;
  const schedule = req.body.schedule;

  try {
    const adminInfo = [email, address, contact_no, schedule, id];
    const response = await AdminInfoQuery.updateAdminGeneralInfo(adminInfo);
    const jsonObject = {
      massage: "Success",
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Internal Server Error!" });
  }
});

routes.patch("/admin-info/paymentDetails", async (req, res) => {
  const paymentDetails = req.body.paymentDetails;
  const paymentData = paymentDetails.map(item => [
    item.payment_name,
    item.payment_number,
    item.status,
    item.payment_id,
  ]);
  try {
    const response = await AdminInfoQuery.updateAdminPaymentInfo(
      paymentDetails
    );
    const jsonObject = {
      massage: "Success",
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Internal Server Error!" });
  }
});

module.exports = routes;

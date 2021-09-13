const express = require("express");
const routes = express.Router();
const authRoute = require("./Auth.route");
const ecommerceRoute = require("./Ecommrece.route");
const userinfoRoute = require("./userinfo.route");
routes.use("/auth", authRoute);
routes.use("/ecommrece", ecommerceRoute);
routes.use("/userinfo", userinfoRoute);
module.exports = routes;

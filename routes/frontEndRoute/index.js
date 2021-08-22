const express = require("express");
const { route } = require("../ecommerceRoutes");
const routes = express.Router();
const authRoute = require("./Auth.route");
const ecommerceRoute = require("./Ecommrece.route");
routes.use("/auth", authRoute);
routes.use('/ecommrece',ecommerceRoute);

module.exports = routes;

const express = require("express");
const routes = express.Router();
/** Custom Routes */
const EcommerceRoutes = require("./ecommerceRoutes");
const FileRoutes = require("./fileRoutes");
const CalenderRoute = require("./calenderRoutes");
routes.use(EcommerceRoutes);
routes.use(FileRoutes);
routes.use(CalenderRoute);

module.exports = routes;

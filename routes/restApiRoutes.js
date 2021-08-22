const express = require("express");
const routes = express.Router();
/** Custom Routes */
const EcommerceRoutes = require("./ecommerceRoutes");
const FileRoutes = require("./fileRoutes");
const CalenderRoute = require("./calenderRoutes");
const FrontEndRoute = require('./frontEndRoute')
const { route } = require("./ecommerceRoutes");

routes.use(EcommerceRoutes);
routes.use(FileRoutes);
routes.use(CalenderRoute);
routes.use(FrontEndRoute);
module.exports = routes;

const express = require("express");
const routes = express.Router();
/** Custom Routes */
const EcommerceRoutes = require("./ecommerceRoutes");
const FileRoutes = require("./fileRoutes");
const CalenderRoute = require("./calenderRoutes");
const FrontEndRoute = require("./frontEndRoute");
const EmailRoute = require("./emailRoutes");
const UserRoute = require('./userRoutes') 
routes.use(EcommerceRoutes);
routes.use(FileRoutes);
routes.use(CalenderRoute);
routes.use(FrontEndRoute);
routes.use(EmailRoute);
routes.use(UserRoute)
module.exports = routes;

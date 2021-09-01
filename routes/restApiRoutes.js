const express = require("express");
const routes = express.Router();
/** Custom Routes */
const EcommerceRoutes = require("./ecommerceRoutes");
const FileRoutes = require("./fileRoutes");
const CalenderRoute = require("./calenderRoutes");
const FrontEndRoute = require("./frontEndRoute");
const EmailRoute = require("./emailRoutes");
const UserRoute = require('./userRoutes') 
const AdminInfoRoute = require('./AdminInformationRoute')
const AdminAuthRoute = require('./Admin-auth')
const themeConfig = require('./themeConfigRoutes')
routes.use(EcommerceRoutes);
routes.use(FileRoutes);
routes.use(CalenderRoute);
routes.use(FrontEndRoute);
routes.use(EmailRoute);
routes.use(UserRoute);
routes.use('/themeConfig',themeConfig)
routes.use('/admin',AdminInfoRoute)
routes.use('/adminAuth',AdminAuthRoute)

module.exports = routes;

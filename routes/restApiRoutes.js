const express = require("express");
const routes = express.Router();
/** Custom Routes */
const EcommerceRoutes = require("./ecommerceRoutes");
const FileRoutes = require("./fileRoutes");
const CalenderRoute = require("./calenderRoutes");
const FrontEndRoute = require("./frontEndRoute");
const EmailRoute = require("./emailRoutes");
const UserRoute = require("./userRoutes");
const AdminInfoRoute = require("./AdminInformationRoute");
const AdminAuthRoute = require("./Admin-auth");
const themeConfig = require("./themeConfigRoutes");
const MarketingRoute = require("./marketing");
const BlogRoute = require("./Blog")
const CategoryRoute = require("./categoryRoutes");
routes.use(EcommerceRoutes);
routes.use(FileRoutes);
routes.use(CalenderRoute);
routes.use(FrontEndRoute);
routes.use(EmailRoute);
routes.use(UserRoute);
routes.use("/themeConfig", themeConfig);
routes.use("/admin", AdminInfoRoute);
routes.use("/adminAuth", AdminAuthRoute);
routes.use("/marketing", MarketingRoute);
routes.use("/blog",BlogRoute);
routes.use("/category",CategoryRoute);

module.exports = routes;

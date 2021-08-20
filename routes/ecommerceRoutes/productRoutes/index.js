const express = require("express");
const routes = express.Router();
const AdminProductRoute = require("./AdminProductRoutes");
const ProductRoutes = require("./UserProductRoutes");
routes.use("/admin", AdminProductRoute);
routes.use(ProductRoutes);

module.exports = routes;

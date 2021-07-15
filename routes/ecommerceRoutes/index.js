const express = require("express");
const routes = express.Router();
const ProductRoutes = require("./productRoutes");
const CategoryRoutes = require("./categoryRoutes");

routes.use(ProductRoutes);
routes.use(CategoryRoutes);

module.exports = routes;

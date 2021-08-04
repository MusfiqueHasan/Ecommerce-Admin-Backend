const express = require("express");
const routes = express.Router();
const ProductRoutes = require("./productRoutes");
const CategoryRoutes = require("./categoryRoutes");
const AttributeRoutes = require("./Attributes");
const OptionRoutes = require("./Options");
routes.use(ProductRoutes);
routes.use(CategoryRoutes);
routes.use(AttributeRoutes);
routes.use(OptionRoutes);

module.exports = routes;

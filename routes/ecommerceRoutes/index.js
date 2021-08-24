const express = require("express");
const routes = express.Router();
const ProductRoutes = require("./productRoutes");
const CategoryRoutes = require("./categoryRoutes");
const AttributeRoutes = require("./Attributes");
const OptionRoutes = require("./Options");
const InvoiceRoute = require('./Invoice');
const RatingsRoute = require("./Ratings");
const OrdersRoute = require('./Oreders')

routes.use(ProductRoutes);
routes.use(CategoryRoutes);
routes.use(AttributeRoutes);
routes.use(OptionRoutes);
routes.use(InvoiceRoute);
routes.use(RatingsRoute)
routes.use(OrdersRoute)

module.exports = routes;

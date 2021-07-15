const express = require("express");
const routes = express.Router();
/** Custom Routes */
const EcommerceRoutes = require('./ecommerceRoutes')
const FileRoutes = require('./fileRoutes')

routes.use(EcommerceRoutes)
routes.use(FileRoutes)

module.exports = routes;

const express = require('express')
const apiRoutes = require('./restApiRoutes')
const routes = express()

routes.use('/api',apiRoutes)
routes.get("/", (req, res) => {

	res.send(";hi");
});

module.exports = routes;

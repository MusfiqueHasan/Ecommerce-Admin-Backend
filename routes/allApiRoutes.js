const express = require('express')
const apiRoutes = require('./restApiRoutes')
const routes = express()

routes.use('/api',apiRoutes)
routes.get("/", (req, res) => {
	res.send(process.env.APP_PASSWORD);
	console.log(process.env.APP_PASSWORD)
});

module.exports = routes;
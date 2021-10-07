const express = require("express");
const routes = express.Router();
const faceBookPixel = require("./pixel");
routes.use(faceBookPixel);

module.exports = routes;

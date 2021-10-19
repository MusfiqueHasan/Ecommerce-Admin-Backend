const express = require("express");
const routes = express.Router();

const BlogRoutes = require("./Blogs");
const BlogCategoryRouter = require("./Categories");

routes.use(BlogRoutes);
routes.use("/blog",BlogCategoryRouter);

module.exports = routes;


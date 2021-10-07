const express = require("express");
const routes = express.Router();
const HTTPStatus = require("../../../HTTPStatus");
const { saveBlog } = require("../../../middleware");
const BlogQuerry = require("../../../Querry/BlogQuerry/BlogQuerry");
const { getTimeStamp } = require("../../../Utils/Utils");

routes.get("/blogs", async(req,res) => {
    try {
        const response = await BlogQuerry.getAllBlogs();
        const jsonObject = {
            massage : "SUCCESS",
            results : response
        }
        res.status(HTTPStatus.OK).json(jsonObject);
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({massage : "INTERNAL_SERVER_ERROR"});
    }
})

routes.post("/blogs", saveBlog, async(req,res) => {
    
})

module.exports = routes;

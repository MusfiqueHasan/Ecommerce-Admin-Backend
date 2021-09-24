const express = require("express");
const HTTPStatus = require("../../HTTPStatus");
const BlogQuerry = require("../../Querry/BlogQuerry/BlogQuerry");
const routes = express.Router();

routes.get("/blogs" , async(req,res) => {
    try {
        const response = await BlogQuerry.getAllBlogs();
        console.log(response);
        const jsonObject = {
            massage : "success",
            results : response
        };
        res.status(HTTPStatus.OK).json(jsonObject);
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({message : "INTERNAL SERVER ERROR"});
    }
})



module.exports = routes;



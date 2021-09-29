const express = require("express");
const routes = express.Router();
const HTTPStatus = require("../../../HTTPStatus");
const BlogQuerry = require("../../../Querry/BlogQuerry/BlogQuerry");

routes.get("/categories" ,async (req,res) => {
    try {
        const response = await BlogQuerry.getAllCategories();
        const jsonObject = {
            message : "succeess",
            results : response
        }
        res.status(HTTPStatus.OK).json(jsonObject);
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({message : "INTERNAL SERVER ERROR"})
    }
})

// will be continued with post , patch , delete operations for blog category related data


module.exports = routes;
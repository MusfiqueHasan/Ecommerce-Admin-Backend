const express = require("express");
const routes = express.Router();
const HTTPStatus = require("../../../HTTPStatus");
const { saveBlog } = require("../../../middleware/saveBlog");
const { BlogEvent } = require("../../../Modles/Blog");
const BlogQuerry = require("../../../Querry/BlogQuerry/BlogQuerry");
const Utils = require("../../../Utils/Utils");
const { getTimeStamp } = require("../../../Utils/Utils");

routes.get("/blogs", async(req,res) => {
    try {
        const response = await BlogQuerry.getAllBlogDetails();
        if(response.length === 0){
            const jsonObject = {
                massage : "SUCCESS",
                results : response,
            }
            res.status(HTTPStatus.OK).json(jsonObject);
        }
        let previousValue = BlogEvent(response[0]);
        let blogList = [];
        let indexResponse = 0, indexBlogList = 0;
        previousValue.catagory.push({
            category_id: response[0].category_id,
            category_name: response[0].category_name
        })
        blogList.push(previousValue);
        for (indexResponse = 1; indexResponse < response.length; indexResponse++) {
            let currentValue = response[indexResponse];
            let categoryDetails = {
                category_id: currentValue.category_id,
                category_name: currentValue.category_name
            };
            if(previousValue.blog_id == currentValue.blog_id){
                blogList[indexBlogList].catagory.push(categoryDetails);
            }
            ///asdasd
            else {
                previousValue = currentValue;
                const prototype = BlogEvent(currentValue);
                prototype.catagory.push(categoryDetails)
                blogList.push(prototype);
                indexBlogList++;
            }
        }
        const jsonObject = {
            massage : "SUCCESS",
            results : blogList,
        }
        res.status(HTTPStatus.OK).json(jsonObject);
    } catch (error) {
        console.log(error);
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({massage : "INTERNAL_SERVER_ERROR"});
    }
})

routes.post("/blogs", saveBlog, async(req,res) => {
    const {newBlogId} = req;
    const {blogCategoryList} = req.body;
    const blogCategories = blogCategoryList.map(item => {
        return [newBlogId , item];
    });
    try {
        const response = await BlogQuerry.saveBlogCategoryRelation([blogCategories]);
        if(blogCategoryList.length != response.affectedRows){
            return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({massage : "INTERNAL_SERVER_ERROR...all values didn't pushed"});
        }
        const jsonObject = {
            massage : "success"
        }
        res.status(HTTPStatus.OK).json(jsonObject);
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({massage : "INTERNAL_SERVER_ERROR"});
    }
})

routes.patch("/blogs/:blog_id", async(req,res) => {
    const content = req.body.blogContent || "";
    const images = req.body.blogImaage || "";
    const updated_at = Utils.getTimeStamp();
    const {
        title,
        slug,
        status,
        blog_id,
        id ////////////////////////////
    } = req.body;

    if(!title && !slug && !status && !id){
        return res.status(HTTPStatus.BAD_REQUEST).json({massage : "Insuffient informations"});
    }
    const updatedBlogArray = [
        title,
        slug,
        updated_at,
        content,
        status,
        id,
        images
    ];

    try {
        // console.log(updatedBlogArray);
        const response = await BlogQuerry.updateBlogDetails(blog_id,updatedBlogArray);
        const jsonObject = {
            massage : "success"
        };
        res.status(HTTPStatus.OK).json({jsonObject});
    } catch (error) {
        console.log(error);
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({massage : "INTERNAL_SERVER_ERROR"});
    }
})

routes.delete("/blogs/:blog_id" , async(req,res) => {
    const {blog_id} = req.params;
    try {
        const response = await BlogQuerry.deleteRelation(blog_id);
        response = await BlogQuerry.deleteBlog(blog_id);
        const jsonObject = {
            massage : "success"
        }
        res.status(HTTPStatus.OK).json(jsonObject);
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({massage : "INTERNAL_SERVER_ERROR"});
    }
})


module.exports = routes;

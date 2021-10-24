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
        const response = await BlogQuerry.getAllBlogs();
        
        // const blogData = response.map(async (item) => {
        //     const categoryArray = await BlogQuerry.getCategoryList(item.blog_id);
        //     return BlogEvent(item,categoryArray);
        //     // console.log(item.blog_id);
        // })

        let blogList = [];
        
        for(let i = 0 ; i < response.length ; i++){
            blogList.push(BlogEvent(response[i]));
            const category_response = await BlogQuerry.getCategoryList(response[i].blog_id);
            blogList[i].catagory = category_response;
        }

        // console.log(blogList);

        // const response_categoryList = await BlogQuerry.getCategoryList(1055);
        const jsonObject = {
            massage : "SUCCESS",
            results : blogList,
            // results : response_categoryList
        }
        res.status(HTTPStatus.OK).json(jsonObject);
    } catch (error) {
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
        console.log(blogCategories)
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
        images,
        blog_id
    ];

    try {
        // console.log(updatedBlogArray);
        const response = await BlogQuerry.updateBlogDetails(updatedBlogArray);
        const jsonObject = {
            massage : "success"
        };
    } catch (error) {
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
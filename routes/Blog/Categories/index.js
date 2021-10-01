const express = require("express");
const routes = express.Router();
const HTTPStatus = require("../../../HTTPStatus");
const { NewCategoryModel } = require("../../../Modles/Category");
const BlogQuerry = require("../../../Querry/BlogQuerry/CategoryQuerry");

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

// routes.post("/categories", async(req,res) => {
//     try {
        
//     } catch (error) {
//         res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({message : "INTERNAL SERVER ERROR"})
//     }
// })

// will be continued with post , patch , delete operations for blog category related data
routes.post("/categories" ,async(req,res) => {

    const {
        category_name ,
        parent_id , 
        description
    } = req.body.data;

    const categoryArray = NewCategoryModel(category_name,parent_id,description);    
    
    const inputArray = [
        categoryArray,
    ];
    // const name = category_name;
    // const parent_id = parent_id;
    
    try {
        const response = await BlogQuerry.createNewCategory([inputArray]);
        res.status(HTTPStatus.OK).json({message : "Successfully inseted"});
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({message : "INTERNAL SERVER ERROR"});
    }
})

module.exports = routes;
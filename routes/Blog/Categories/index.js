const express = require("express");
const routes = express.Router();
const HTTPStatus = require("../../../HTTPStatus");
const { NewCategoryModel } = require("../../../Modles/Category");
const BlogQuerry = require("../../../Querry/BlogQuerry/CategoryQuerry");
const { getTimeStamp } = require("../../../Utils/Utils");

routes.get("/categories" ,async (req,res) => {
    try {
        const response = await BlogQuerry.getAllCategories();
        const jsonObject = {
            message : "success",
            results : response
        }
        res.status(HTTPStatus.OK).json(jsonObject);
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({message : "INTERNAL SERVER ERROR"})
    }
})

routes.post("/categories" ,async(req,res) => {

    const {
        name ,
        description,
        parent_id
    } = req.body.categoryData;

    const parent_category  = parent_id ? parent_id : null;
    const category_name = name;
    const updated_at = getTimeStamp();
    const inserted_at = getTimeStamp();
    
    if(!description){
        description = "";
    }

    const newCategoryArray = [
        category_name,
        parent_category,
        updated_at,
        inserted_at,
        description
    ]
    const inputArray = [
        newCategoryArray
    ];

    try {
        const response = await BlogQuerry.createNewCategory([inputArray]);
        res.status(HTTPStatus.OK).json({message : "success"});
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({message : "INTERNAL SERVER ERROR"});
    }
})

routes.patch("/categories/:id",async(req,res) => {
    const {id} = req.params;
    const {
        name ,
        description,
        parent_id
    } = req.body.categoryData;

    const category_id = id ? id : null;
    const category_name = name;
    const parent_category  = parent_id ? parent_id : null;
    const updated_at = getTimeStamp();

    if(!category_id){
        return res.status(HTTPStatus.BAD_REQUEST).json({message : "category id not found"});
    }

    const newCategoryArray = [
        category_name,
        parent_category,
        updated_at,
        description,
        category_id
    ]
    try {
        const response = await BlogQuerry.updateCategory(newCategoryArray);
        res.status(HTTPStatus.OK).json({message : "success"});
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({message : "INTERNAL SERVER ERROR"});
    }
})

routes.delete("/categories/:id" , async(req,res) => {
    const {id} = req.params;

    const category_id = id ;
    
    if(!category_id){
        return res.status(HTTPStatus.BAD_REQUEST).json({message : "category id not found"});
    }

    try {
        const response = await BlogQuerry.deleteCategory(category_id);
        res.status(HTTPStatus.OK).json({message : "success"});
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({message : "INTERNAL SERVER ERROR"});
    }
})
module.exports = routes;
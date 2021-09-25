const express = require("express");
const createError = require("http-errors");
const HTTPStatus = require("../../HTTPStatus");
const { NewCategoryModel, UpatedCategoryModel } = require("../../Modles/Category");
const CategoryQuerry = require("../../Querry/CategoryQuerry/CategoryQuerry");

const routes = express.Router();

routes.get("/categories", async(req,res) => {
    try {
        const response = await CategoryQuerry.getAllCategories();
        console.log(response);
        const jsonObject = {
            massage : "success",
            results : response
        };
        res.status(HTTPStatus.OK).json(jsonObject);
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({massage : "INTERNAL_SERVER_ERROR"});
    }
})

routes.get("/parent-categories" , async(req,res) => {
    try {
        const response = await CategoryQuerry.getAllParentCategories();
        console.log(response);
        const jsonObject = {
            massage : "success",
            results : response
        };
        res.status(HTTPStatus.OK).json(jsonObject);
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({massage : "INTERNAL_SERVER_ERROR"});
    }
})

routes.post("/new-category" , async(req , res) => {
    try {
        //// a "data named objec is expected"
        const inputCategory = NewCategoryModel(req.body.data);
        /// if name of category is not sent
        if(inputCategory.name){
            ///// if parent ID is not selected
            if(inputCategory.parent_id === false || inputCategory.parent_id === ""){
                inputCategory.parent_id = -1000;
            }
            /// save data
            const response = await CategoryQuerry.createNewCategory(inputCategory);
            console.log(response);
            const jsonObject = {
                massage : "success",
                results : inputCategory
            };
        res.status(HTTPStatus.OK).json(jsonObject);
        } else {
            throw createError.BadRequest("INVALID category name");
        }
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({massage : "INTERNAL_SERVER_ERROR"});
    }
})

routes.patch("/category" , async(req,res) => {
    try {
        const inputCategory = UpatedCategoryModel(req.body.data);
        console.log(inputCategory);
        if(inputCategory.id && inputCategory.name){
            const response = await CategoryQuerry.updateCategory(inputCategory);
            const jsonObject = {
                massage : "success"
            };
            res.status(HTTPStatus.RESET_CONTENT).json(jsonObject);
        } else {
            throw createError.BadRequest("invalid category name or ID is missing");
        }
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({massage : "INTERNAL_SERVER_ERROR"});
    }
})

routes.delete("/category", async(req,res) => {
    try {
        const inputData = req.body.id;
        if(inputData){
            const response = await CategoryQuerry.deleteCategory(inputData);
            const jsonObject = {
                massage : "success"
            };
            res.status(HTTPStatus.OK).json(jsonObject);
        } else {
            throw createError.BadRequest("Invalid ID number");
        }
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({massage : "INTERNAL_SERVER_ERROR"});
    }
})
module.exports = routes
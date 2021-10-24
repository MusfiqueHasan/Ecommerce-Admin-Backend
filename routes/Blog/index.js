const express = require("express");
const routes = express.Router();

const BlogRoutes = require("./Blogs");
const BlogCategoryRouter = require("./Categories");

routes.use(BlogRoutes);
routes.use("/blog",BlogCategoryRouter);

module.exports = routes;
// const express = require("express");
// const { NotExtended } = require("http-errors");
// const HTTPStatus = require("../../HTTPStatus");
// const { NewCategoryModel } = require("../../Modles/Category");
// const BlogQuerry = require("../../Querry/BlogQuerry/BlogQuerry");
// const routes = express.Router();

// routes.get("/blogs" , async(req,res) => {
//     try {
//         const response = await BlogQuerry.getAllBlogs();
//         console.log(response);
//         const jsonObject = {
//             massage : "success",
//             results : response
//         };
//         res.status(HTTPStatus.OK).json(jsonObject);
//     } catch (error) {
//         res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({message : "INTERNAL SERVER ERROR"});
//     }
// })

// routes.get("/categories" ,async (req,res) => {
//     try {
//         const response = await BlogQuerry.getAllCategories();
//         const jsonObject = {
//             massage : "success",
//             results : response
//         };
//         res.status(HTTPStatus.OK).json(jsonObject);
//     } catch (error) {
//         res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({massage : "INTERNAL_SERVER_ERROR"});
        
//     }
// })

// routes.post("/new-categories", async(req,res) => {
//     try {
//         const inputCategory = NewCategoryModel(req.body.data);
//         if(inputCategory.name){
//             ///// if parent ID is not selected
//             if(inputCategory.parent_id === false || inputCategory.parent_id === ""){
//                 inputCategory.parent_id = -1000;
//             }
//             /// save data
//             const response = await BlogQuerry.createNewCategory;
//             console.log(response);
//             const jsonObject = {
//                 massage : "success",
//                 results : inputCategory
//             };
//         res.status(HTTPStatus.OK).json(jsonObject);
//         } else {
//             throw createError.BadRequest("INVALID category name");
//         }
//     } catch (error) {
//         res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({massage : "INTERNAL_SERVER_ERROR"});
//     }
// })


// // routes.post("/categories" , (req,res) => {
// //     try {

// //     } catch (error) {
// //         res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({message : "INTERNAL SERVER ERROR"});
// //     }
// // })


// module.exports = routes;



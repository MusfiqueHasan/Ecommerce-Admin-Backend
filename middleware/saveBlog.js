const HTTPStatus = require("../HTTPStatus");
const BlogQuerry = require("../Querry/BlogQuerry/BlogQuerry");
const Utils = require("../Utils/Utils");

const saveBlog = async(req,res,next) => {
    const content = req.body.blogContent || "";
    const images = req.body.images || "";
    const updated_at = Utils.getTimeStamp();
    const inserted_at = Utils.getTimeStamp();
    const {
        title,
        slug,
        status,
        id, ////////////////////////////
    } = req.body;

    if(!title && !slug && !status && !id){
        return res.status(HTTPStatus.BAD_REQUEST).json({massage : "Insuffient informations"});
    }
    const newBlogArray = [
        title,
        slug,
        updated_at,
        inserted_at,
        content,
        status,
        id,
        images
    ]
    const inputArray = [
        newBlogArray
    ];

    try {
        const response = await BlogQuerry.postNewBlog([inputArray]);
        const newBlogId = response.insertId;
        req.newBlogId = newBlogId;
    } catch (error) {
        return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({massage : "INTERNAL SERVER ERROR"});
    }
    next();
}

module.exports = {
  saveBlog
};
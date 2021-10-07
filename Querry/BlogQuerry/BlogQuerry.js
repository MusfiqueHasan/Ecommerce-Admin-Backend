const PromiseModule = require("../../helpers/Promise/PromiseModule");

const BlogQuerry = {
    getAllBlogs,
    postNewBlog,
    saveBlogCategoryRelation,
    updateBlogDetails,
    deleteRelation,
    deleteBlog,
}

async function getAllBlogs(){
    const sqlQuerry = `SELECT * FROM blog`;
    return PromiseModule.readData(sqlQuerry);
}

async function postNewBlog(inputArray) {
    const sqlQuerry = "INSERT INTO blog (title, slug, updated_at, inserted_at, content, product_status_id, id, images) VALUES?";
    return PromiseModule.createUpdateDelete(sqlQuerry,inputArray);
}

async function saveBlogCategoryRelation(inputArray) {
    const sqlQuerry = "INSERT INTO category_blog_relation (blog_id, category_id) VALUES?";
    return PromiseModule.createUpdateDelete(sqlQuerry,inputArray);
}

async function updateBlogDetails(inputArray) {
    console.log(inputArray);
    const sqlQuerry = "UPDATE blog SET title = ? , slug = ? , updated_at = ? , content = ? prodeuct_status = ? , id = ? , images = ? WHERE `blog`.`blog_id` = ?";
    return PromiseModule.createUpdateDelete(sqlQuerry,inputArray);
}

async function deleteRelation(inputData) {
    const sqlQuerry = "DELETE FROM `category_blog_relation` WHERE blog_id = ?";
    return PromiseModule.createUpdateDelete(sqlQuerry,inputData);
}

async function deleteBlog(inputData) {
    const sqlQuerry = "DELETE FROM `blog` WHERE blog_id = ?";
    return PromiseModule.createUpdateDelete(sqlQuerry,inputData);
}


module.exports = BlogQuerry
const PromiseModule = require("../../helpers/Promise/PromiseModule");

const BlogQuerry = {
    getAllBlogs,
    getCategoryList,
    postNewBlog,
    saveBlogCategoryRelation,
    updateBlogDetails,
    deleteRelation,
    deleteBlog,
}

async function getAllBlogs(){
    const sqlQuerry = `SELECT blog_id,title,slug,images,content,blog.inserted_at AS inserted_at,blog.updated_at AS updated_at,name as status,id as userId,fullName as username FROM blog NATURAL JOIN admin_auth,product_status WHERE blog.id = admin_auth.id AND blog.product_status_id = product_status.product_status_id`;
    return PromiseModule.readData(sqlQuerry);
}

async function getCategoryList(inputData) {
    const sqlQuerry = `SELECT category_id,category_name FROM category_blog_relation NATURAL JOIN blog_categories WHERE blog_id = ${inputData}`;
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
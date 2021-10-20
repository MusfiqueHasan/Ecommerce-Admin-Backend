const PromiseModule = require("../../helpers/Promise/PromiseModule");

const BlogQuerry = {
    getAllBlogs,
    getCategoryList,
    getAllBlogDetails,
    postNewBlog,
    saveBlogCategoryRelation,
    updateBlogDetails,
    deleteCategoriesByCategoryId,
    deleteRelation,
    deleteBlog,
}

async function getAllBlogs(){
    const sqlQuerry = `SELECT blog_id,title,slug,images,content,blog.inserted_at AS inserted_at,blog.updated_at AS updated_at,name as status,id as userId,fullName as username FROM blog NATURAL JOIN admin_auth,product_status WHERE blog.id = admin_auth.id AND blog.product_status_id = product_status.product_status_id`;
    return PromiseModule.readData(sqlQuerry);
}

async function getAllBlogDetails() {
    const sqlQuerry = "SELECT category_blog_relation.blog_id AS blog_id, category_blog_relation.category_id AS category_id, title, slug, join1.updated_at AS updated_at, join1.inserted_at AS inserted_at, content, join1.id as userId, images, join4.name AS status, category_name, parent_category, description, join3.userName AS username FROM category_blog_relation LEFT JOIN( SELECT * FROM blog ) AS join1 ON 1 LEFT JOIN(SELECT * FROM blog_categories) AS join2 ON 1 LEFT JOIN( SELECT * FROM admin_auth ) AS join3 ON 1 LEFT JOIN( SELECT * FROM product_status ) AS join4 ON 1 WHERE join1.blog_id = category_blog_relation.blog_id AND join2.category_id = category_blog_relation.category_id AND join1.id = join3.id AND join1.product_status_id = join4.product_status_id ORDER BY join1.inserted_at DESC";
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

async function updateBlogDetails(blog_id,inputArray) {
    const sqlQuerry = `UPDATE blog SET title =?,slug=?,updated_at=?,content=?,product_status_id=?,id=?,images=? WHERE blog_id = ${blog_id} ;`;
    return PromiseModule.createUpdateDelete(sqlQuerry, inputArray);
}
async function deleteCategoriesByCategoryId(inputDeletedCategories) {
    const sqlQuerry = "DELETE FROM category_blog_relation WHERE (blog_id,category_id) IN (?)";
    return PromiseModule.createUpdateDelete(sqlQuerry,inputDeletedCategories);
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
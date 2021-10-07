const PromiseModule = require("../../helpers/Promise/PromiseModule");

const BlogQuerry = {
    getAllBlogs,
    postNewBlog
}

async function getAllBlogs(){
    const sqlQuerry = `SELECT * FROM blog`;
    return PromiseModule.readData(sqlQuerry);
}

async function postNewBlog(inputArray) {
    const sqlQuerry = "INSERT INTO blog (title, slug, updated_at, inserted_at, content, product_status_id, id, images) VALUES?";
    return PromiseModule.createUpdateDelete(sqlQuerry,inputArray);
}

async function newBlogID(inputData) {
    const sqlQuerry = "SELECT blog_id FROM blog WHERE title = ? AND slug = ? AND content = ? AND product_status_id = ? AND id = ?";
    return PromiseModule.createUpdateDelete(sqlQuerry,inputData);
}

module.exports = BlogQuerry
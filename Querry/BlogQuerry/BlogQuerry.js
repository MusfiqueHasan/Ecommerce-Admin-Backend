const PromiseModule = require("../../helpers/Promise/PromiseModule");

const BlogQuerry = {
    getAllBlogs
}

async function getAllBlogs() {
    const sqlSearch = `SELECT * FROM blog `;
    return PromiseModule.readData(sqlSearch);
}

module.exports = BlogQuerry
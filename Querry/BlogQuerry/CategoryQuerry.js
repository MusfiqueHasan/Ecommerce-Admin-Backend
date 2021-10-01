const PromiseModule = require("../../helpers/Promise/PromiseModule");

const CategoryQuerry = {
    getAllCategories,
    createNewCategory,
    updateCategory,
    deleteCategory
}

async function getAllCategories() {
    const sqlQuerry = `SELECT * FROM blog_categories `;  ///// will be in descending order
    return PromiseModule.readData(sqlQuerry);
}

async function createNewCategory(inputArray) {
    const sqlQuerry = "INSERT INTO blog_categories (category_name, parent_category, updated_at, inserted_at, description) Values?";
    return PromiseModule.createUpdateDelete(sqlQuerry,inputArray);
}

async function updateCategory(inputArray) {
    const sqlQuerry = "UPDATE blog_categories SET category_name = ? , parent_category = ? , updated_at = ? , description = ? WHERE category_id = ?";
    // const inputArray = [inputCategory.name , inputCategory.parent_id, inputCategory.updated_at,inputCategory.description , inputCategory.id];
    return PromiseModule.createUpdateDelete(sqlQuerry,inputArray);    
}

async function deleteCategory(inputdata) {
    const sqlQuerry = `DELETE FROM blog_categories WHERE category_id = ?`;
    const inputArray = [inputdata];
    return PromiseModule.createUpdateDelete(sqlQuerry,inputArray);    
}


module.exports = CategoryQuerry;
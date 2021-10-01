const { getTimeStamp } = require("../Utils/Utils");

const NewCategoryModel = (category_name,parent_id,description) =>{
    const newCategory = { 
        name : category_name || null,
        parent_id : parent_id || null,
        inserted_at : getTimeStamp(),
        updated_at : getTimeStamp(),
        description : description || null
    };
    const newCategoryArray = [
        newCategory.name,
        newCategory.parent_id,
        newCategory.inserted_at,
        newCategory.updated_at,
        newCategory.description
    ]
    return newCategoryArray;
}

const UpatedCategoryModel = (data) =>{
    const category = { 
        id : data.id,
        name : data.category_name || "",
        parent_id : data.parent_id || false,
        inserted_at : 0,
        updated_at : 0,
        description : data.description
    };
    return category;
}

module.exports = {
    NewCategoryModel,
    UpatedCategoryModel
}
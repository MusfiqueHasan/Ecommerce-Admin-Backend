const { getTimeStamp } = require("../Utils/Utils");

const NewCategoryModel = (category_name,parent_id,description) =>{
    
    
    const newCategory = { 
        category_id : null,
        category_name : category_name || null,
        parent_category : parent_id  ? parent_id : null,
        updated_at : getTimeStamp(),
        inserted_at : getTimeStamp(),
        description : description || null
    };
    console.log("completed");
    const newCategoryArray = [
        newCategory.category_name,
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
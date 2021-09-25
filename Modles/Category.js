
const NewCategoryModel = (data) =>{
    const category = { 
        name : data.category_name,
        parent_id : data.parent_id || false,
        inserted_at : 0,
        updated_at : 0,
        description : data.description
    };
    return category;
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
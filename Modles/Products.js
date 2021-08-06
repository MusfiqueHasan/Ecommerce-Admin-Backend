const Utils = require("../Utils/Utils");

const INDEX_THRESHOLD = -1;

const ProductModel = (productData, inserted_at, updated_at) => {
  const {
    sku,
    parent_id,
    product_status_id,
    view_on_website,
    featured_product,
    popular_product,
    isTaxable,
    hasFreeShipping,
    isDisableDiscount,
    manageStock,
    featured_img,
    regular_price,
    discount_price
  } = productData;
  const productInfo = {
    sku: sku || null,
    parent_id: parent_id || null,
    product_status_id: product_status_id || null,
    view_on_website: view_on_website || false,
    featured_product: featured_product || false,
    popular_product: popular_product || false,
    isTaxable: isTaxable || false,
    hasFreeShipping: hasFreeShipping || false,
    isDisableDiscount: isDisableDiscount || false,
    manageStock: manageStock || false,
    featured_img: featured_img || null,
    regular_price: regular_price || 0,
    discount_price: discount_price || null,
    inserted_at: inserted_at,
    updated_at: updated_at
  };
  return productInfo;
};
const ProductInventoryModel = (data, product_id, inserted_at, updated_at) => {
  const { quantity, stock_threshold, inventory_status } = data;

  const inventory = {
    product_id: product_id,
    inventory_status: inventory_status || 1, // 1-> In Stock 2-> Out Of Stock
    quantity: quantity || 0,
    stock_threshold: stock_threshold || null,
    inserted_at: inserted_at,
    updated_at: updated_at
  };
  return inventory;
};

const ProductResponseModel = product => {
  const new_product = { ...product };
  delete new_product.attribute_id;
  delete new_product.attribute_name;
  delete new_product.option_id;
  delete new_product.option_name;
  return new_product;
};

const ParentProductModel = data => {
  const attributeArray = [];
  if (data.length < 2) return ProductResponseModel(data[0]);

  data.map(item => {
    const index = Utils.findInArray(
      attributeArray,
      item.attribute_id,
      "attribute_id"
    );

    if (index === INDEX_THRESHOLD) {
      const attributeObject = {
        attribute_name: item.attribute_name,
        attribute_id: item.attribute_id,
        options: []
      };
      attributeArray.push(attributeObject);
    }
    const optionsObject = {
      option_id: item.option_id,
      option_name: item.option_name
    };
    const idx = Utils.findInArray(
      attributeArray,
      item.attribute_id,
      "attribute_id"
    );
    attributeArray[idx]["options"].push(optionsObject);
  });
  const product = { ...data[0], attributes: attributeArray };
  return ProductResponseModel(product);
};
module.exports = {
  ProductModel,
  ProductInventoryModel,
  ProductResponseModel,
  ParentProductModel
};

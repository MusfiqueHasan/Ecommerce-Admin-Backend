const Utils = require("../Utils/Utils");

const INDEX_THRESHOLD = -1;

const ProductModel = (productData, inserted_at, updated_at) => {
  const productInfo = {
    sku: productData.sku || null,
    slug: productData.slug,
    parent_id: productData.parent_id || null,
    product_status_id: productData.product_status_id || null,
    productType: productData.productType || null,
    view_on_website: productData.view_on_website || false,
    featured_product: productData.featured_product || false,
    popular_product: productData.popular_product || false,
    isTaxable: productData.isTaxable || false,
    hasFreeShipping: productData.hasFreeShipping || false,
    isDisableDiscount: productData.isDisableDiscount || false,
    manageStock: productData.manageStock || false,
    inventory_status: productData.inventory_status || 1,
    featured_img: productData.featured_img || null,
    regular_price: productData.regular_price || 0,
    discount_price: productData.discount_price || null,
    inserted_at: inserted_at,
    updated_at: updated_at,
  };
  return productInfo;
};
const ProductInventoryModel = (data, product_id, inserted_at, updated_at) => {
  const inventory = {
    product_id: product_id,
    allowBackOrders: data.allowBackOrders || 1, //('Do not allow', 'Allow, but notify customer', 'Allow')
    quantity: data.quantity || 0,
    stock_threshold: data.stock_threshold || null,
    inserted_at: inserted_at,
    updated_at: updated_at,
  };
  return inventory;
};

const ProductResponseModel = product => {
  const new_product = { ...product };
  delete new_product.attribute_id;
  delete new_product.attribute_name;
  delete new_product.option_id;
  delete new_product.option_name;
  delete new_product.category_id;
  delete new_product.category_name;
  return new_product;
};

const ProductDetailsModel = (product, product_id, inserted_at, updated_at) => {
  const product_details = {
    product_id: product_id,
    product_name: product.name,
    short_description: product.short_description || null,
    long_description: product.long_description || null,
    product_gallery: product.product_gallery || null,
    inserted_at: inserted_at,
    updated_at: updated_at,
  };
  return product_details;
};

const ParentProductModel = data => {
  const attributeArray = [];
  const categories = [];

  if (data.length === 1)
    return ProductResponseModel({
      ...data[0],
      categories: [
        {
          category_id: data[0].category_id,
          category_name: data[0].category_name,
        },
      ],
    });

  data.map(item => {
    if (
      Utils.findInArray(categories, item.category_id, "category_id") ===
      INDEX_THRESHOLD
    ) {
      const categoryObject = {
        category_id: item.category_id,
        category_name: item.category_name,
      };
      categories.push(categoryObject);
    }
    if (item.attribute_id) {
      const index = Utils.findInArray(
        attributeArray,
        item.attribute_id,
        "attribute_id"
      );

      if (index === INDEX_THRESHOLD) {
        const attributeObject = {
          attribute_name: item.attribute_name,
          attribute_id: item.attribute_id,
          options: [],
        };
        attributeArray.push(attributeObject);
      }
      const optionsObject = {
        option_id: item.option_id,
        option_name: item.option_name,
      };
      const idx = Utils.findInArray(
        attributeArray,
        item.attribute_id,
        "attribute_id"
      );

      if (
        Utils.findInArray(
          attributeArray[idx]["options"],
          item.option_id,
          "option_id"
        ) === INDEX_THRESHOLD
      ) {
        attributeArray[idx]["options"].push(optionsObject);
      }
    }
  });
  const product = {
    ...data[0],
    categories: categories,
  };
  console.log(categories);
  if (attributeArray.length > 0) product["attributes"] = attributeArray;
  return ProductResponseModel(product);
};
module.exports = {
  ProductModel,
  ProductInventoryModel,
  ProductResponseModel,
  ParentProductModel,
  ProductDetailsModel,
};

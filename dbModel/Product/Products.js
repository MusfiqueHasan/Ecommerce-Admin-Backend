const PromiseModule = require("../Promise/PromiseModule");
const Utils = require("../../Utils/Utils");

const LIMIT_THRESHOLD = 15;
const Products = {
  addProducts,
  addProductToCategories,
  addProductGallery,
  getProducts,
  getFeaturedProducts,
  getPopularProducts,
  addProductDetails,
  addProductToAttributes,
  addProductToVariants
};

async function addProducts(productDetails) {
  const sqlInsert =
    "Insert Into product (sku,parent_id,product_status_id,view_on_website,featured_product,popular_product,isTaxable,isDisableDiscount,featured_img,regular_price,discount_price, inserted_at, updated_at) Values ?";

  return PromiseModule.createUpdateDelete(sqlInsert, productDetails);
}

async function addProductDetails(productDetails) {
  const {
    product_id,
    product_name,
    short_description,
    long_description,
    product_gallery,
    inserted_at,
    updated_at
  } = productDetails;

  const sqlInsert =
    "Insert into product_details (product_id, product_name,short_description,long_description,product_gallery,inserted_at,updated_at) Values (?,?,?,?,?,?,?)";

  const productDetailsData = [
    product_id,
    product_name,
    short_description,
    long_description,
    product_gallery,
    inserted_at,
    updated_at
  ];

  return PromiseModule.createUpdateDelete(sqlInsert, productDetailsData);
}

async function addProductToCategories(categories) {
  const sqlInsert =
    "Insert into product_categories(category_id,product_id,inserted_at,	updated_at) Values ?";

  return PromiseModule.createUpdateDelete(sqlInsert, categories);
}

async function addProductToAttributes(attributes) {
  const sqlInsert =
    "Insert into product_attribute(product_id,attribute_id) Values ?";
  return PromiseModule.createUpdateDelete(sqlInsert, attributes);
}

async function addProductToVariants(product_variants) {
  const sqlInsert =
    "Insert into product_variants(product_variant_id,product_variant_combinations) Values ?";

  return PromiseModule.createUpdateDelete(sqlInsert, product_variants);
}

async function addProductGallery(product_gallery) {
  const sqlInsert =
    "Insert Into product_details (product_id,product_gallery) values (?,?)";

  return PromiseModule.createUpdateDelete(sqlInsert, product_gallery);
}

async function getProducts(pageNumber, productLimit) {
  let sqlSearch = "";

  if (pageNumber) {
    // limit
    const page = parseInt(pageNumber);
    const limit = productLimit ? parseInt(productLimit) : LIMIT_THRESHOLD;
    const offset = (page - 1) * limit;
    sqlSearch = `Select * from products LIMIT  ${limit} OFFSET  ${offset}`;
  } else {
    sqlSearch = "Select * from products";
  }
  return PromiseModule.readData(sqlSearch);
}
async function getFeaturedProducts(type, pageNumber, productLimit) {
  let sqlSearch = "";

  if (pageNumber) {
    // limit
    const page = parseInt(pageNumber);
    const limit = productLimit ? parseInt(productLimit) : LIMIT_THRESHOLD;
    const offset = (page - 1) * limit;
    sqlSearch = `Select * from products where featured_product = ${type} LIMIT  ${limit} OFFSET  ${offset}`;
  } else {
    sqlSearch = `Select * from products where featured_product = ${type}`;
  }
  return PromiseModule.readData(sqlSearch);
}

async function getPopularProducts(type, pageNumber, productLimit) {
  let sqlSearch = "";

  if (pageNumber) {
    // limit
    const page = parseInt(pageNumber);
    const limit = productLimit ? parseInt(productLimit) : LIMIT_THRESHOLD;
    const offset = (page - 1) * limit;
    sqlSearch = `Select * from products where popular_product = ${type} LIMIT  ${limit} OFFSET  ${offset}`;
  } else {
    sqlSearch = `Select * from products where popular_product = ${type}`;
  }
  return PromiseModule.readData(sqlSearch);
}

module.exports = Products;

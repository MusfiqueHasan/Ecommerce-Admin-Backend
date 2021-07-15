const PromiseModule = require("../Promise/PromiseModule");
const Utils = require("../../Utils/Utils");

const LIMIT_THRESHOLD = 15
const Products = {
  addProducts,
  addProductToCategories,
  addProductGallery,
  getProducts,
  getFeaturedProducts,
  getPopularProducts
};

async function addProducts(productDetails, inserted_at) {
  const sqlInsert =
    "Insert into products (sku,	name,	description,	product_status_id,	regular_price,	discount_price,	quantity,	inserted_at,	updated_at,	view_on_website,	featured_img,featured_product,popular_product) Values (?,?,?,?,?,?,?,?,?,?,?,?,?)";
  const {
    sku,
    name,
    description,
    productStatusId,
    regular_price,
    discount_price,
    quantity,
    view_on_website,
    featured_img,
    featured_product,
    popular_product
  } = productDetails;
  const productData = [
    sku,
    name,
    description,
    productStatusId,
    regular_price,
    discount_price,
    quantity,
    inserted_at,
    inserted_at,
    view_on_website,
    JSON.stringify({ featured_img: featured_img }),
    featured_product || false,
    popular_product || false
  ];
  return PromiseModule.createUpdateDelete(sqlInsert, productData);
}

async function addProductToCategories(categories) {
  const sqlInsert =
    "Insert into product_categories(category_id,product_id,inserted_at,	updated_at) Values ?";

  return PromiseModule.createUpdateDelete(sqlInsert, categories);
}

async function addProductGallery(product_gallery) {
  const sqlInsert =
    "Insert Into product_details (product_id,product_gallery) values (?,?)";

  return PromiseModule.createUpdateDelete(sqlInsert, product_gallery);
}

async function getProducts(pageNumber,productLimit) {
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
async function getFeaturedProducts(type, pageNumber,productLimit) {
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

async function getPopularProducts(type, pageNumber,productLimit) {
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

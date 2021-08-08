const PromiseModule = require("../../dbModel/Promise/PromiseModule");
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
	addProductToVariants,
	getSingleProductDetails,
	getProductVariants
};

async function addProducts(productDetails) {
	const sqlInsert =
		"Insert Into product (sku,parent_id,product_status_id,view_on_website,featured_product,popular_product,isTaxable,isDisableDiscount,manageStock,featured_img,regular_price,discount_price, inserted_at, updated_at) Values ?";

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
	let sqlSearch =
		"SELECT p.product_id,p.isTaxable,p.isDisableDiscount,p.hasFreeShipping,p.featured_img,p.regular_price,p.discount_price,pd.product_name,Product_attribute.attribute_id,Product_attribute.option_name, Product_attribute.option_id, Product_attribute.attribute_name FROM product as p INNER JOIN product_details as pd ON p.product_id = pd.product_id LEFT JOIN ( SELECT pa.attribute_id, pa.product_id, attributes.attribute_name,options.option_id,options.option_name FROM product_attribute as pa, attributes,options WHERE pa.attribute_id = attributes.attribute_id AND options.attribute_id = attributes.attribute_id ) as Product_attribute On Product_attribute.product_id = p.product_id ORDER BY p.product_id";

	if (pageNumber) {
		// limit
		const page = parseInt(pageNumber);
		const limit = productLimit ? parseInt(productLimit) : LIMIT_THRESHOLD;
		const offset = (page - 1) * limit;
		sqlSearch = `${sqlSearch} LIMIT  ${limit} OFFSET  ${offset}`;
	}
	return PromiseModule.readData(sqlSearch);
}

// SELECT * FROM product,product_variants,prduct_inventory WHERE product_variants.product_variant_id = product.product_id And product.parent_id = 128 And prduct_inventory.product_id = product.product_id

async function getSingleProductDetails(product_id) {
	const sqlSearch = `SELECT * FROM product INNER JOIN product_details ON product.product_id = product_details.product_id  AND product.product_id = ${product_id} LEFT JOIN ( SELECT product_attribute.attribute_id, product_attribute.product_id, attributes.attribute_name,options.option_id,options.option_name FROM product_attribute, attributes,options WHERE product_attribute.attribute_id = attributes.attribute_id AND options.attribute_id = attributes.attribute_id ) as Product_attribute On Product_attribute.product_id = product.product_id LEFT JOIN prduct_inventory ON prduct_inventory.product_id = product.product_id ORDER BY product.product_id`;

	return PromiseModule.readData(sqlSearch);
}

async function getProductVariants(product_id) {
	const sqlSearch = `SELECT * FROM product,product_variants,prduct_inventory WHERE product_variants.product_variant_id = product.product_id And product.parent_id = ${product_id} And prduct_inventory.product_id = product.product_id`;

	return PromiseModule.readData(sqlSearch);
}

async function getFeaturedProducts(type, pageNumber, productLimit) {
	let sqlSearch = "";

	if (pageNumber) {
		// limit
		const page = parseInt(pageNumber);
		const limit = productLimit ? parseInt(productLimit) : LIMIT_THRESHOLD;
		const offset = (page - 1) * limit;
		sqlSearch = `Select * from product where featured_product = ${type} LIMIT  ${limit} OFFSET  ${offset}`;
	} else {
		sqlSearch = `Select * from product where featured_product = ${type}`;
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
		sqlSearch = `Select * from product where popular_product = ${type} LIMIT  ${limit} OFFSET  ${offset}`;
	} else {
		sqlSearch = `Select * from product where popular_product = ${type}`;
	}
	return PromiseModule.readData(sqlSearch);
}

module.exports = Products;

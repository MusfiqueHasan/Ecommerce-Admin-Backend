const express = require("express");
const routes = express.Router();
const Product = require("../../../dbModel/Product/Products");
const Inventory = require("../../../dbModel/Product/Inventory");
const Utils = require("../../../Utils/Utils");

const {
  ProductModel,
  ProductInventoryModel
} = require("../../../Modles/Products");

const { parentProduct } = require("../../../middleware");

routes.get("/get-products", async (req, res) => {
  const { page, limit } = req.query;
  try {
    const response = await Product.getProducts(page, limit);
    const jsonData = {
      status: "success",
      data: {
        total_products: response.length,
        products: [...response]
      }
    };
    res.status(200).json(jsonData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Something Went Wrong" });
  }
});

routes.get("/get-featured-product", async (req, res) => {
  const { page, limit } = req.query;
  const type = req.body.type || 1;
  try {
    const response = await Product.getFeaturedProducts(type, page, limit);
    const jsonData = {
      status: "success",
      data: {
        total_products: response.length,
        products: [...response]
      }
    };
    res.status(200).json(jsonData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Something Went Wrong" });
  }
});

routes.get("/get-popular-product", async (req, res) => {
  /** 1 -> true
   *  0 -> false
   */

  const { page, limit } = req.query;
  const type = req.body.type || 1;

  try {
    const response = await Product.getPopularProducts(type, page, limit);
    const jsonData = {
      status: "success",
      data: {
        total_products: response.length,
        products: [...response]
      }
    };
    res.status(200).json(jsonData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Something Went Wrong" });
  }
});

routes.get("/products", async (req, res) => {
  console.log(req.body);
});

routes.post("/product", parentProduct, async (req, res) => {
  const { product_info } = req;
  const { inserted_at, updated_at, product_id } = product_info;
  const {
    variants,
    categories,
    product_name,
    short_description,
    long_description,
    attribute_id,
    product_gallery
  } = req.body;

  const product_details = {
    product_id: product_id,
    product_name: product_name,
    short_description: short_description || null,
    long_description: long_description || null,
    product_gallery: product_gallery || null,
    inserted_at: inserted_at,
    updated_at: updated_at
  };

  //product and categories table data
  const productsToCategories = categories.map(item => [
    item.value,
    product_id,
    inserted_at,
    updated_at
  ]);

  // product and attribute table data
  const productsToAttributes = attribute_id.map(item => [
    product_id,
    item.attribute_id
  ]);
  // product inventory data
  const inventory = [
    Object.values(
      ProductInventoryModel(req.body, product_id, inserted_at, updated_at)
    )
  ];

  // product variants
  const product_variants =
    variants &&
    variants.map(item =>
      Object.values(
        ProductModel(
          {
            ...item,
            parent_id: product_id
          },
          inserted_at,
          updated_at
        )
      )
    );

  try {
    //// HAVE TO OPTIMIZE HERE
    await Product.addProductToCategories([productsToCategories]);
    await Product.addProductToAttributes([productsToAttributes]);
    await Product.addProductDetails(product_details);
    await Inventory.addInventory([inventory]);
    const response = await Product.addProducts([product_variants]);
    const startingInsertedIndex = response.insertId;

    // product variations combination
    const product_attributes_combination =
      variants &&
      variants.map((item, index) => [
        index + startingInsertedIndex,
        item.combinations
      ]);

    // variants inventory data
    const variants_Inventory =
      variants &&
      variants.map((item, index) =>
        Object.values(
          ProductInventoryModel(
            item,
            index + startingInsertedIndex,
            inserted_at,
            updated_at
          )
        )
      );
    await Inventory.addInventory([variants_Inventory]);
    await Product.addProductToVariants([product_attributes_combination]);
    console.log("final", response);

    const jsonObject = {
      massage: "success",
      product: {
        ...req.body,
        product_id: product_id,
        inserted_at: inserted_at,
        updated_at: updated_at
      }
    };
    res.status(201).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Something Went Wrong" });
  }
});

module.exports = routes;

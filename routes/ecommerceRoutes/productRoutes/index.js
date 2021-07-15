const express = require("express");
const routes = express.Router();
const Product = require("../../../dbModel/Product/Products");
const Utils = require("../../../Utils/Utils");

routes.post("/add-product", async (req, res) => {
  console.log("as", req.body);

  const { product } = req.body;
  const {
    categories,
    product_gallery,
    featured_product,
    popular_product
  } = product;
  try {
    const inserted_at = Utils.getTimeStamp();
    const updated_at = inserted_at;
    const { insertId } = await Product.addProducts(product, inserted_at);
    const productId = insertId;

    const productsToCategories = categories.map(item => [
      item.value,
      productId,
      inserted_at,
      updated_at
    ]);
    await Product.addProductToCategories([productsToCategories]);
    await Product.addProductGallery([
      productId,
      JSON.stringify({ product_gallery: product_gallery })
    ]);
    const jsonData = {
      ...product,
      product_id: productId,
      featured_product: featured_product || false,
      popular_product: popular_product || false
    };
    res.status(200).json(jsonData);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Something Went Wrong" });
  }
});

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

module.exports = routes;

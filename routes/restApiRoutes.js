const express = require("express");
const routes = express.Router();
const Categories = require("../dbModel/Product/Categories");
const Product = require("../dbModel/Product/Products");
const Files = require("../dbModel/Files/Files");
const Utils = require("../Utils/Utils");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const dir = `/home/rat/Desktop/multikart/EcommerceAdminPanel/full-version/src/assets/uploads/`;
    const absPath = path.resolve(
      "/home/rat/Desktop/multikart/EcommerceAdminPanel/full-version/src/assets/",
      "../..",
      "uploads"
    );
    const exists = fs.existsSync(absPath);

    if (!exists) {
      fs.mkdirSync(absPath, { recursive: true });
    }

    console.log(dir);
    cb(null, dir);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

routes.post("/add-category", async (req, res) => {
  const { categoryData } = req.body;
  const { name, description, parent_id } = categoryData;
  try {
    const inserted_at = Utils.getTimeStamp();
    const response = await Categories.addCategories(
      name,
      parent_id,
      description,
      inserted_at,
      inserted_at
    );
    const jsonData = {
      category_id: response.insertId,
      name: name,
      description: description,
      parent_id: parent_id
    };
    return res.status(200).json(jsonData);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Something Went Wrong" });
  }
});

routes.get("/categories", async (req, res) => {
  try {
    const response = await Categories.getCategories();
    return res.status(200).json({
      status: "success",
      data: {
        total_categories: response.length,
        categories: [...response]
      }
    });
  } catch (error) {
    return res.status(400).json({ msg: "Something Went Wrong" });
  }
});

routes.post("/remove-a-category", async (req, res) => {
  try {
    const { category_id } = req.body;
    const response = await Categories.removeACategory(category_id);
    return res.status(200).json({
      status: "success",
      msg: "Successfully remove item"
    });
  } catch (error) {
    return res.status(400).json({ msg: "Something Went Wrong" });
  }
});

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

routes.post("/file-upload", upload.single("file"), async (req, res) => {
  const { originalname, mimetype } = req.file;

  const inserted_at = Utils.getTimeStamp();
  const size = req.file.size;
  try {
    const response = await Files.insertFile(
      originalname,
      mimetype,
      inserted_at,
      size
    );
    const jsonData = {
      file_name: originalname,
      mime_type: mimetype,
      inserted_at: inserted_at,
      size: size,
      file_id: response.insertId
    };
    res.status(200).json(jsonData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Something Went Wrong" });
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

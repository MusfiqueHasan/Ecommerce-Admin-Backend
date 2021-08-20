const express = require("express");
const routes = express.Router();
const ProductQuery = require("../../../Querry/Product/Products");

const {
  ParentProductModel,
} = require("../../../Modles/Products");

routes.get("/get-products", async (req, res) => {
  const { page, limit } = req.query;
  try {
    const response = await ProductQuery.getProductsForUsers(page, limit);
    const jsonData = {
      status: "success",
      data: {
        total_products: response.length,
        products: [...response],
      },
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
    const response = await ProductQuery.getFeaturedProducts(type, page, limit);
    const jsonData = {
      status: "success",
      data: {
        total_products: response.length,
        products: [...response],
      },
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
    const response = await ProductQuery.getPopularProducts(type, page, limit);
    const jsonData = {
      status: "success",
      data: {
        total_products: response.length,
        products: [...response],
      },
    };
    res.status(200).json(jsonData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Something Went Wrong" });
  }
});

routes.get("/products", async (req, res) => {
  const { page, limit } = req.query;
  ///here is some problem when pagination
  try {
    const response = await ProductQuery.getProductsForUsers(page, limit);
    const product_data_response = [];

    for (let i = 0; i < response.length; ) {
      const data = response.filter(item => {
        return item.product_id === response[i].product_id;
      });
      product_data_response.push(ParentProductModel(data));
      i = i + data.length;
    }
    const jsonObject = {
      massage: "success",
      total_products: product_data_response.length,
      products: [...product_data_response],
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
});

routes.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await ProductQuery.getSingleProductDetails(id);
    console.log(response);
    const parentProduct = ParentProductModel(response);
    if (Object.entries(parentProduct).length === 0)
      return res.status(404).json({ massage: "Product is not found" });
    const response_of_vairants = await ProductQuery.getProductVariants(id);

    const variants =
      response_of_vairants.length > 0 ? [...response_of_vairants] : null;

    parentProduct["variants"] = variants;

    const jsonObject = {
      massage: "success",
      product: parentProduct,
    };

    res.status(200).json(jsonObject);
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
});


module.exports = routes;

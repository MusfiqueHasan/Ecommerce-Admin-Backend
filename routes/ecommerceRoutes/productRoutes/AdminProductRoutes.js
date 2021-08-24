const express = require("express");
const routes = express.Router();
const ProductQuery = require("../../../Querry/Product/Products");
const InventoryQuery = require("../../../Querry/Product/Inventory");
const AttributeQuery = require("../../../Querry/Product/Attributes");
const CategoriesQuery = require("../../../Querry/Product/Categories");
const Utils = require("../../../Utils/Utils");
const ShippingQuery = require("../../../Querry/Product/Shipping");
const {
  ProductModel,
  ProductInventoryModel,
  ProductResponseModel,
  ParentProductModel,
  ProductDetailsModel,
} = require("../../../Modles/Products");

const { parentProduct } = require("../../../middleware");

routes.get("/get-products", async (req, res) => {
  const { page, limit } = req.query;
  try {
    const response = await ProductQuery.getProducts(page, limit);
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
    const response = await ProductQuery.getProducts(page, limit);
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
routes.get("/edit/products/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const response = await ProductQuery.getSingleProductDetailsAdmin(id);
    console.log(response);
    const productDetails = response[0];
    let shippingDetails = null;
    let inventoryDetails = null;
    if (!productDetails.hasFreeShipping) {
      const shipping_response = await ShippingQuery.getShippingDetails(id);
      console.log(shipping_response);
      shippingDetails = shipping_response[0];
    }
    if (productDetails.manageStock) {
      const inventory_response = await InventoryQuery.getInventoryById(id);

      inventoryDetails = inventory_response[0];
    }
    const product_categories = await CategoriesQuery.getCategoriesBy(id);

    const attributes = [];
    const attribute_response = await AttributeQuery.getAttributesById(id);
    attribute_response.map(item => {
      if (
        Utils.findInArray(attributes, item.attribute_id, "value") === -1
      ) {
        attributes.push({
          value: item.attribute_id,
          label: item.attribute_name,
        });
      }
    });
    const response_of_vairants = await ProductQuery.getProductVariants(id);
    const product = {
      ...productDetails,
      inventory: inventoryDetails,
      shipping: shippingDetails,
      categories: [...product_categories],
      attributes: attributes.length > 0 ? [...attributes] : null,
      variants:
        response_of_vairants.length > 0 ? [...response_of_vairants] : null,
    };
    const jsonObject = {
      massage: "Success",
      results: product,
    };

    res.status(200).json(jsonObject);
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
});

routes.post("/product", parentProduct, async (req, res) => {
  const { product_info } = req;
  const { product } = req.body;
  const { inserted_at, updated_at, product_id, hasFreeShipping } = product_info;
  const {
    variations,
    categories,
    attributesList,
    product_options,
    shipping_cost,
  } = product;

  //product details
  const product_details = [
    Object.values(
      ProductDetailsModel(product, product_id, inserted_at, updated_at)
    ),
  ];

  console.log(product_details);
  //product and categories table data
  const productsToCategories = categories.map(item => [
    item.value,
    product_id,
    inserted_at,
    updated_at,
  ]);

  // product inventory data
  const inventory = product_info.manageStock
    ? [
        Object.values(
          ProductInventoryModel(product, product_id, inserted_at, updated_at)
        ),
      ]
    : null;

  // product and attribute table data
  const productsToAttributes = attributesList
    ? attributesList.map(item => [product_id, item.attribute_id])
    : null;

  // product and options table data
  const productsToOptions = product_options
    ? product_options.map(item => [product_id, item])
    : null;

  // product variations
  const product_variations = variations
    ? variations &&
      variations.map(item =>
        Object.values(
          ProductModel(
            {
              ...item,
              parent_id: product_id,
            },
            inserted_at,
            updated_at
          )
        )
      )
    : null;

  // product shipping details
  const shippingDetails = !hasFreeShipping
    ? [
        [
          product_id,
          shipping_cost,
          product.shipping_details || "",
          updated_at,
          inserted_at,
        ],
      ]
    : null;
  try {
    //// HAVE TO OPTIMIZE HERE
    await ProductQuery.addProductToCategories([productsToCategories]);
    await ProductQuery.addProductDetails([product_details]);
    productsToOptions &&
      (await ProductQuery.addProductToOptions([productsToOptions]));
    productsToAttributes &&
      (await ProductQuery.addProductToAttributes([productsToAttributes]));
    inventory && (await InventoryQuery.addInventory([inventory]));
    shippingDetails &&
      (await ProductQuery.addProductToShipping([shippingDetails]));

    if (variations) {
      const response = await ProductQuery.addProducts([product_variations]);
      const startingInsertedIndex = response.insertId;

      // product variations combination
      const product_attributes_combination =
        variations &&
        variations.map((item, index) => [
          index + startingInsertedIndex,
          item.combinations,
        ]);

      // variations inventory data
      let variations_Inventory = [];

      variations &&
        variations.map((item, index) => {
          if (item.manageStock)
            variations_Inventory.push(
              Object.values(
                ProductInventoryModel(
                  item,
                  index + startingInsertedIndex,
                  inserted_at,
                  updated_at
                )
              )
            );
        });

      await InventoryQuery.addInventory([variations_Inventory]);
      await ProductQuery.addProductToVariants([product_attributes_combination]);
    }
    const jsonObject = {
      massage: "success",
      product: {
        ...req.body,
        product_id: product_id,
        inserted_at: inserted_at,
        updated_at: updated_at,
      },
    };
    res.status(201).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "Something Went Wrong" });
  }
});

routes.get("/invoice/search", async (req, res) => {
  const name = req.query.name;
  // console.log(req);
  try {
    const response = await ProductQuery.getProductsByName(name);
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
    console.log(error);
    res.status(500).json({ massage: "Internal Server Error!" });
  }
});

module.exports = routes;

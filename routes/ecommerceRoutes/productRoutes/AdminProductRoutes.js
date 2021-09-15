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
const HTTPStatus = require("../../../HTTPStatus");
const { ProductShippingClassModel } = require("../../../Modles/Shipping");

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
    res.status(HTTPStatus.OK).json(jsonData);
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
    res.status(HTTPStatus.OK).json(jsonData);
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
    res.status(HTTPStatus.OK).json(jsonData);
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
      products: [...product_data_response].reverse(),
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: error.massage });
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

    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error" });
  }
});

routes.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  if (!Utils.isIdValid(id))
    return res.status(404).json({ massage: "Product is not found" });

  try {
    await ProductQuery.removeProduct(id);
    await ProductQuery.removeProductVariants(id);
    const jsonObject = {
      massage: "Success",
    };

    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error" });
  }
});

routes.get("/edit/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await ProductQuery.getSingleProductDetailsAdmin(id);
    const productDetails = response[0];
    let shippingDetails = null;
    let inventoryDetails = null;
    if (!productDetails.hasFreeShipping) {
      const shipping_response = await ShippingQuery.getShippingDetails(id);
      shippingDetails = shipping_response.map(item =>
        ProductShippingClassModel(item)
      );
    }
    if (productDetails.manageStock) {
      const inventory_response = await InventoryQuery.getInventoryById(id);

      inventoryDetails = inventory_response[0];
    }
    const product_categories = await CategoriesQuery.getCategoriesBy(id);

    const attributes = [];
    const options = [];
    const attribute_response = await AttributeQuery.getAttributesById(id);
    const response_of_vairants = await ProductQuery.getProductVariants(id);
    const product = {
      ...productDetails,
      inventory: inventoryDetails,
      shipping: shippingDetails,
      // options: options.length > 0 ? [...options] : null,
      categories: [...product_categories],
      // attributes: attributes.length > 0 ? [...attributes] : null,
      variants:
        response_of_vairants.length > 0 ? [...response_of_vairants] : null,
    };
    const jsonObject = {
      massage: "Success",
      results: product,
    };

    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: error.massage });
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
    ? shipping_cost.map(shipping_id => [shipping_id, product_id])
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
    res.status(HTTPStatus.CREATED).json(jsonObject);
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error" });
  }
});

routes.patch("/products/basicInfo/:id", async (req, res) => {
  const { id } = req.params;
  const product_name = req.body.product_name;
  const short_description = req.body.short_description;
  const long_description = req.body.long_description;
  const product_gallery = req.body.product_gallery;
  const updated_at = req.body.updated_at || Utils.getTimeStamp();
  const sku = req.body.sku;
  const slug = req.body.slug;
  const product_status_id = req.body.product_status_id;
  const view_on_website = req.body.view_on_website;
  const featured_img = req.body.featured_img;
  const newCategories = req.body.newCategories || null;
  const deletedCategories = req.body.deletedCategories || null;
  const inserted_at = updated_at;
  const productsToCategories = newCategories
    ? newCategories.map(item => [item, parseInt(id), inserted_at, updated_at])
    : null;

  const deletedCategoriesFromProduct = deletedCategories
    ? deletedCategories.map(category => [category, parseInt(id)])
    : null;

  console.log(productsToCategories, deletedCategories);
  const productBasicInfoData = [
    sku,
    slug,
    product_status_id,
    view_on_website,
    featured_img,
    updated_at,
    parseInt(id),
  ];

  const productDetailsData = [
    product_name,
    short_description,
    long_description,
    product_gallery,
    updated_at,
    parseInt(id),
  ];

  try {
    productsToCategories &&
      productsToCategories.length > 0 &&
      (await ProductQuery.addProductToCategories([productsToCategories]));
    deletedCategoriesFromProduct &&
      deletedCategories.length > 0 &&
      (await ProductQuery.deleteProductFromCategoriesById([
        deletedCategoriesFromProduct,
      ]));
    const productBasicInfoResponse =
      await ProductQuery.updateProductBasicInfoById(productBasicInfoData);
    const productDetailsInfoResponse =
      await ProductQuery.updateProductDetailsInfoById(productDetailsData);

    const jsonObject = {
      massage: "Updated!",
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error!" });
  }
});

routes.patch("/products/priceInfo/:id", async (req, res) => {
  const { id } = req.params;
  const regular_price = req.body.regular_price;
  const discount_price = req.body.discount_price;

  try {
    await ProductQuery.updateProductPriceById([
      regular_price,
      discount_price,
      id,
    ]);
    const jsonObject = {
      massage: "Updated!",
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error!" });
    console.log(error);
  }
});

routes.patch("/products/inventory/:id", async (req, res) => {
  const { id } = req.params;
  try {
  } catch (error) {
    console.log(error);
  }
});

routes.patch("/products/shipping/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProductShipping = req.body.deletedProductShipping || [];
  const insertedProductShipping = req.body.insertedProductShipping || [];
  const newHasFreeShipping = req.body.newHasFreeShipping;
  const previousHasFreeShipping =
    req.body.previousHasFreeShipping === 1 ||
    req.body.previousHasFreeShipping === true
      ? true
      : false;

  const deletedProductShippingData = deletedProductShipping.map(id => [id]);
  const insertedProductShippingData = insertedProductShipping.map(
    shipping_id => [shipping_id, id]
  );
  console.log(req.body);
  if (
    newHasFreeShipping === false &&
    previousHasFreeShipping === true &&
    insertedProductShippingData.length === 0
  )
    return res
      .status(HTTPStatus.BAD_REQUEST)
      .json({ massage: "Select a shipping class" });
  try {
    if (
      newHasFreeShipping === previousHasFreeShipping &&
      newHasFreeShipping === false
    ) {
      deletedProductShippingData.length > 0 &&
        (await ProductQuery.removeProductFromShipping([
          deletedProductShipping,
        ]));
      insertedProductShippingData.length > 0 &&
        (await ProductQuery.addProductToShipping([
          insertedProductShippingData,
        ]));
    }
    if (newHasFreeShipping === false && previousHasFreeShipping === true) {
      insertedProductShippingData.length > 0 &&
        (await ProductQuery.addProductToShipping([
          insertedProductShippingData,
        ]));
    }
    if (newHasFreeShipping === true && previousHasFreeShipping === false) {
      await ProductQuery.removeAllProductFromShippingById([id]);
    }
    await ProductQuery.updateProductShippingStatusById([
      newHasFreeShipping,
      id,
    ]);

    const response = await ShippingQuery.getShippingDetails(id);
    const jsonObject = {
      massage: "Updated",
      results: response.map(shipping_details =>
        ProductShippingClassModel(shipping_details)
      ),
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error" });
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
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error!" });
  }
});

routes.patch("/popular/:id", async (req, res) => {
  const { id } = req.params;
  const params = req.body.popular;

  try {
    const response = await ProductQuery.updatePopularProducts(id, params);

    const jsonObject = {
      massage: "success",
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error!" });
  }
});

routes.patch("/featured/:id", async (req, res) => {
  const { id } = req.params;
  const params = req.body.featured;
  console.log(params);
  try {
    const response = await ProductQuery.updateFeaturedProducts(id, params);
    const jsonObject = {
      massage: "success",
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error!" });
  }
});

module.exports = routes;

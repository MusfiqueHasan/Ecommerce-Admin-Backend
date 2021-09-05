const express = require("express");
const routes = express.Router();
const ProductQuery = require("../../../Querry/Product/Products");

const { ParentProductModel } = require("../../../Modles/Products");

routes.get("/get-products", async (req, res) => {
  const { page, limit } = req.query;
  try {
    const response = await ProductQuery.getProductsForUsers(page, limit);
    const productData = response.map(item => ({
      id: item.product_id,
      name: item.product_name,

      image: item.featured_img,
      slug: item.slug,
      price: item.reagular_price,
    }));
    const jsonData = {
      status: "success",
      data: {
        total_products: response.length,
        products: [...productData],
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
  const { page, limit, category } = req.query;
  ///here is some problem when pagination
  try {
    const response = await ProductQuery.getProductsForUsers(
      page,
      limit,
      category
    );
    const product_data_response = [];

    for (let i = 0; i < response.length; ) {
      const data = response.filter(item => {
        return item.product_id === response[i].product_id;
      });
      product_data_response.push(ParentProductModel(data));
      i = i + data.length;
    }
    const productData = product_data_response.map(item => ({
      id: item.product_id,
      name: item.product_name,
      image: item.featured_img,
      price: item.regular_price,
      discount: item.discount_price,
      slug: item.slug,
      shortDescription: item.short_description,
    }));
    const jsonObject = {
      massage: "success",
      total_products: product_data_response.length,
      products: [...productData],
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
});

routes.get("/products/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const response = await ProductQuery.getSingleProductDetailsBySlug(slug);

    console.log("slug", slug);
    const parentProduct = ParentProductModel(response);

    if (Object.entries(parentProduct).length === 0)
      return res.status(404).json({ massage: "Product is not found" });

    const response_of_vairants = await ProductQuery.getProductVariants(
      parentProduct.product_id
    );
    const variants =
      response_of_vairants.length > 0 ? [...response_of_vairants] : null;

    parentProduct["variants"] = variants;

    const productData = {
      id: parentProduct.product_id,
      featured_img: parentProduct.featured_img,
      name: parentProduct.product_name,
      slug: parentProduct.slug,
      price: parentProduct.discount_price
        ? parentProduct.discount_price
        : parentProduct.regular_price,
      regularPrice: parentProduct.discount_price
        ? parentProduct.regular_price
        : null,
      inStock: parentProduct.inventory_status,
      attributes: parentProduct.attributes,
      shortDescription: parentProduct.short_description,
      longDescription: parentProduct.long_description,
      images: JSON.parse(parentProduct.product_gallery),
      categories: parentProduct.categories,
      variants: parentProduct.variants
        ? parentProduct.variants.map(item => ({
            id: item.product_id,
            slug: item.slug,
            inventoryStatus: item.inventory_status,
            price: item.discount_price,
            regularPrice: item.regular_price,
            image: JSON.parse(item.featured_img),
            variantCombination: item.product_variant_combinations,
          }))
        : null,
    };
    // console.log(parentProduct.attributes)
    const jsonObject = {
      massage: "Success",
      product: productData,
    };

    res.status(200).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: error.massage });
  }
});

routes.get("/products/price/:ids", async (req, res) => {
  const { ids } = req.params;
  console.log(ids);
  try {
    const response = await ProductQuery.getProductPriceAndStockStatusById(ids);
    const jsonObject = {
      massage: "Success",
      product: [...response],
    };

    res.status(200).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: error.massage });
  }
});

routes.get("/newArrival", async (req, res, next) => {
  try {
    const response = await ProductQuery.getNewArivalProduct();
    const product_data_response = [];

    for (let i = 0; i < response.length; ) {
      const data = response.filter(item => {
        return item.product_id === response[i].product_id;
      });
      product_data_response.push(ParentProductModel(data));
      i = i + data.length;
    }
    const productData = product_data_response.map(item => ({
      id: item.product_id,
      name: item.product_name,
      image: item.featured_img,
      price: item.discount_price ? item.discount_price : item.regular_price,
      regularPrice: item.discount_price ? item.regular_price : null,
      slug: item.slug,
      shortDescription: item.short_description,
    }));
    const jsonObject = {
      massage: "success",
      total_products: product_data_response.length,
      products: [...productData],
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
});
routes.get("/popularProducts", async (req, res, next) => {
  try {
    const response = await ProductQuery.popularProducts();
    const product_data_response = [];

    for (let i = 0; i < response.length; ) {
      const data = response.filter(item => {
        return item.product_id === response[i].product_id;
      });
      product_data_response.push(ParentProductModel(data));
      i = i + data.length;
    }
    const productData = product_data_response.map(item => ({
      id: item.product_id,
      name: item.product_name,
      image: JSON.parse(item.featured_img),

      price: item.discount_price ? item.discount_price : item.regular_price,
      regularPrice: item.discount_price ? item.regular_price : null,

      slug: item.slug,
      shortDescription: item.short_description,
    }));
    const jsonObject = {
      massage: "success",
      total_products: product_data_response.length,
      products: [...productData],
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
});

routes.get("/featureProducts", async (req, res, next) => {
  try {
    const response = await ProductQuery.featuredProducts();
    const product_data_response = [];

    for (let i = 0; i < response.length; ) {
      const data = response.filter(item => {
        return item.product_id === response[i].product_id;
      });
      product_data_response.push(ParentProductModel(data));
      i = i + data.length;
    }
    const productData = product_data_response.map(item => ({
      id: item.product_id,
      name: item.product_name,
      image: JSON.parse(item.featured_img),
      price: item.discount_price ? item.discount_price : item.regular_price,
      regularPrice: item.discount_price ? item.regular_price : null,

      slug: item.slug,
      shortDescription: item.short_description,
    }));
    const jsonObject = {
      massage: "success",
      total_products: product_data_response.length,
      products: [...productData],
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
});

routes.get('/discounted-products',async(req,res)=>{
  try {
    const response = await ProductQuery.discountedProducts();
    const product_data_response = [];

    for (let i = 0; i < response.length; ) {
      const data = response.filter(item => {
        return item.product_id === response[i].product_id;
      });
      product_data_response.push(ParentProductModel(data));
      i = i + data.length;
    }
    const productData = product_data_response.map(item => ({
      id: item.product_id,
      name: item.product_name,
      image: JSON.parse(item.featured_img),
      price: item.discount_price ? item.discount_price : item.regular_price,
      regularPrice: item.discount_price ? item.regular_price : null,

      slug: item.slug,
      shortDescription: item.short_description,
    }));
    const jsonObject = {
      massage: "success",
      total_products: product_data_response.length,
      products: [...productData],
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
})

routes.get("/related-products",async(req,res,next)=>{
   const {categoryId,productId} = req.query
   try{
    const response = await ProductQuery.getRelatedProductForUser(categoryId, productId);
    const productData = response.map(item => ({
      id: item.product_id,
      name: item.product_name,
      image: item.featured_img,
      slug: item.slug,
      price:item.discount_price?item.discount_price:item.regular_price,
      regularPrice:item.discount_price?item.regular_price:null,
    }));
    const jsonData = {
      status: "success",
      data: {
        total_products: response.length,
        products: [...productData],
      },
    };
    res.status(200).json(jsonData); 
   }
   catch(err){
      console.log(err)
   }
})

module.exports = routes;

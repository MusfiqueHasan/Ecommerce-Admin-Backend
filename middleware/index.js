const Utils = require("../Utils/Utils");
const Products = require("../Querry/Product/Products");
const { ProductModel } = require("../Modles/Products");
const { getTimeStamp } = require("../Utils/Utils");
const HTTPStatus = require("../HTTPStatus");
const BlogQuerry = require("../Querry/BlogQuerry/BlogQuerry");

const parentProduct = async (req, res, next) => {
  const updated_at = (inserted_at = Utils.getTimeStamp());
  // Product Basic Info
  const { product } = req.body;

  if (!product.categories || product.categories.length === 0)
    return res.status(400).json({ massage: "Please Select A Category" });

  console.log(product.view_on_website);
  if (product.view_on_website === null)
    return res
      .status(400)
      .json({ massage: "Please select if you want to view it on website" });

  if (!product.name || product.name === "")
    return res.status(400).json({ massage: "Please select a product name" });

  if (!product.product_status_id)
    return res.status(400).json({ massage: "Please select a product status" });

  if(!product.slug || product.slug === "")return res.status(400).json({ massage: "Slug is empty" });

  const basicInfoOfProduct = ProductModel(product, inserted_at, updated_at);
  const productData = [Object.values(basicInfoOfProduct)];

  try {
    const response = await Products.addProducts([productData]);
    const product_info = {
      ...basicInfoOfProduct,
      updated_at: updated_at,
      inserted_at: inserted_at,
      product_id: response.insertId,
    };
    req.product_info = product_info;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ massage: error.massage });
  }

  next();
};

const saveBlog = async(req,res,next) => {
    const content = req.body.blogContent || "";
    const images = req.body.blogImaage || "";
    const updated_at = getTimeStamp();
    const inserted_at = getTimeStamp();
    const {
        title,
        slug,
        status,
        id ////////////////////////////
    } = req.body;

    if(!title && !slug && !status && !id){
        res.status(HTTPStatus.BAD_REQUEST).json({massage : "Insuffient informations"});
    }
    const newBlogArray = [
        title,
        slug,
        updated_at,
        inserted_at,
        content,
        status,
        id,
        images
    ]
    const inputArray = [
        newBlogArray
    ];

    try {
        const response = await BlogQuerry.postNewBlog([inputArray]);
        console.log(response);
        if(response.affectedRows === 0){
            return res.status(HTTPStatus.EXPECTATION_FAILED).json({massage : "failed to insert data"});
        }
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({massage : "INTERNAL SERVER ERROR"});
    }

    ///////////// grabbing last pushed value

    // try {
      
    // } catch (error) {
    //   res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({massage : "INTERNAL SERVER ERROR"});
      
    // }

    next();
}

module.exports = { 
  parentProduct,
  saveBlog
};

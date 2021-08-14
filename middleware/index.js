const Utils = require("../Utils/Utils");
const Products = require("../Querry/Product/Products");
const { ProductModel } = require("../Modles/Products");

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
module.exports = { parentProduct };

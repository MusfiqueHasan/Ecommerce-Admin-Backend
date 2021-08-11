const Utils = require("../Utils/Utils");
const Products = require("../Querry/Product/Products");
const { ProductModel } = require("../Modles/Products");

const parentProduct = async (req, res, next) => {
  const updated_at = (inserted_at = Utils.getTimeStamp());
  // Product Basic Info
  const { product } = req.body;
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
    console.log(product_info);
    req.product_info = product_info;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ massage: error.massage });
  }

  next();
};
module.exports = { parentProduct };

const Utils = require("../Utils/Utils");
const Products = require("../dbModel/Product/Products");
const { ProductModel } = require("../Modles/Products");


const parentProduct = async (req, res, next) => {
  const updated_at = (inserted_at = Utils.getTimeStamp());
  // Product Basic Info
  const productData = [
    Object.values(ProductModel(req.body, inserted_at, updated_at))
  ];
  try {
    const response = await Products.addProducts([productData]);
    const product_info = {
      ...productData,
      updated_at: updated_at,
      inserted_at: inserted_at,
      product_id: response.insertId
    };
    req.product_info = product_info;
  } catch (error) {
    return res.status(500).json({ massage: error.massage });
  }

  next();
};
module.exports = { parentProduct };

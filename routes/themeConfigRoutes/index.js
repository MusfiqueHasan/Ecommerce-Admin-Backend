const express = require("express");
const HTTPStatus = require("../../HTTPStatus");
const routes = express.Router();
const adminInfo = require("../../Querry/AdminInfo");
const Utils = require("../../Utils/Utils");

routes.get("/slider-image", async (req, res, next) => {
  try {
    const sliderdata = await adminInfo.getSliderImg();
    const sliderImages = JSON.parse(sliderdata[0].value);

    // console.log(sliderdata[0].value)
    res.status(HTTPStatus.OK).json({
      message: "Successfull",
      totalImage: sliderImages.length,
      images: sliderImages,
    });
  } catch (err) {
    next(err);
  }
});

routes.patch("/slider-image", async (req, res) => {
  const sliders = req.body.sliders || [];
  const updated_at = req.body.updated_at || Utils.getTimeStamp();
  const sliderData = [JSON.stringify(sliders), updated_at];
  try {
    const response = await adminInfo.updateSliderImg(sliderData);
    res.status(HTTPStatus.OK).json({
      message: "Successful",
    });
  } catch (error) {
      console.log(error)
    res
      .status(HTTPStatus.INTERNAL_SERVER_ERROR)
      .json({ massage: "Internal Server Error!" });
  }
});
module.exports = routes;

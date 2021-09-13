const express = require("express");
const routes = express.Router();
const Utils = require("../../../Utils/Utils");
const ReviewQuery = require("../../../Querry/Product/Ratings");
const { Ratings } = require("../../../Modles/Reviews");
const HTTPStatus = require("../../../HTTPStatus");

routes.get("/ratings", async (req, res) => {
  try {
    const response = await ReviewQuery.getReview();
    const jsonObject = {
      massage: "Success",
      results: response.map(item => Ratings(item)),
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error!" });
  }
});

routes.get("/ratings/:id", async (req, res) => {
  const { id } = req.params;
  if (!Utils.isIdValid(id))
    return res.status(404).json({ massage: "Review is not found" });

  try {
    const response = await ReviewQuery.getReviewById(id);
    const jsonObject = {
      massage: "Success",
      results: response.map(item => Ratings(item)),
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error!" });
  }
});

routes.get("/rating/total", async (req, res) => {
  try {
    const response = await ReviewQuery.getRatingByCount();
    const jsonObject = {
      massage: "Success",
      results: [...response],
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error!" });
  }
});

routes.delete("/ratings/:id", async (req, res) => {
  const { id } = req.params;
  if (!Utils.isIdValid(id))
    return res.status(404).json({ massage: "Review is not found" });

  try {
    const response = await ReviewQuery.removeReview([id]);
    const jsonObject = {
      massage: "Success",
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error!" });
  }
});

routes.patch("/ratings/:id", async (req, res) => {
  const { id } = req.params;
  const params = req.body.params;
  if (!Utils.isIdValid(id))
    return res.status(404).json({ massage: "Review is not found" });

  try {
    const response = await ReviewQuery.updateReview([params, id]);
    const jsonObject = {
      massage: "Success",
    };
    res.status(HTTPStatus.OK).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error!" });
  }
});

routes.post("/rating", async (req, res) => {
  const ratings = req.body.ratings || 5;
  const comment = req.body.comment;
  const inserted_at = req.body.inserted_at || Utils.getTimeStamp();
  const updated_at = req.body.updated_at || Utils.getTimeStamp();
  const isApproved = req.body.isApproved || false;
  const user_email = req.body.user_email || null;
  const product_id = req.body.product_id;

  if (!product_id)
    res.status(400).json({ massage: "Product id can not be empty!" });

  if (!comment || comment === "")
    res.status(400).json({ massage: "Comment can not be empty!" });

  const reviewData = [
    [
      ratings,
      comment,
      inserted_at,
      updated_at,
      isApproved,
      user_email,
      product_id,
    ],
  ];
  console.log(reviewData);
  try {
    const response = await ReviewQuery.addReview([reviewData]);
    console.log(response);
    const jsonObject = {
      massage: "Please wait for admin approval!",
    };
    res.status(HTTPStatus.CREATED).json(jsonObject);
  } catch (error) {
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error!" });
  }
});

module.exports = routes;

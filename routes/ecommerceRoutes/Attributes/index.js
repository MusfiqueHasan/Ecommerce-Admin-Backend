const express = require("express");
const routes = express.Router();
const Utils = require("../../../Utils/Utils");
const Attributes = require("../../../dbModel/Product/Attributes");
// get attributes
routes.get("/attributes", async (req, res) => {
  try {
    const response = await Attributes.getAttributes();
    const jsonObject = {
      massage: "success",
      results: [...response]
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    res.status(400).json({ massage: error.massage });
  }
});

// post attribute
routes.post("/attribute", async (req, res) => {
  const { attribute_name } = req.body;
  const inserted_at = Utils.getTimeStamp();
  const updated_at = inserted_at;
  try {
    const response = await Attributes.addAttribute(
      attribute_name,
      inserted_at,
      updated_at
    );
    const jsonObject = {
      massage: "success",
      results: {
        attribute_id: response.insertId,
        attribute_name: attribute_name
      }
    };
    res.status(201).json(jsonObject);
  } catch (error) {
    res.status(404).json({ massage: error.massage });
  }
});

// remove attribute/<id>
routes.delete("/attributes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Attributes.removeAttribute(id);
    const jsonObject = {
      massage: "Attribute has been removed"
    };
    if (response.affectedRows < 1) {
      return res.status(404).json({ massage: "Attribute is not found" });
    }
    res.status(200).json(jsonObject);
  } catch (error) {
    res.status(404).json({ massage: error.massage });
  }
});

module.exports = routes;

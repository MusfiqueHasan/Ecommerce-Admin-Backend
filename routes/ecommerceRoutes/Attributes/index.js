const express = require("express");
const routes = express.Router();
const Utils = require("../../../Utils/Utils");
const AttributesQuery = require("../../../Querry/Product/Attributes");
const OptionsQuery = require("../../../Querry/Product/Options");
const { AttributeOptionModel } = require("../../../Modles/Attributes");
// get attributes
routes.get("/attributes", async (req, res) => {
  try {
    const response = await AttributesQuery.getAttributes();
    const attribute_option_response = [];
    for (let i = 0; i < response.length; ) {
      const data = response.filter(item => {
        return item.attribute_id === response[i].attribute_id;
      });
      attribute_option_response.push(AttributeOptionModel(data));
      i = i + data.length;
    }
    const jsonObject = {
      massage: "success",
      results: [...attribute_option_response],
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    res.status(500).json({ massage: error.massage });
  }
});

// post attribute
routes.post("/attribute", async (req, res) => {
  const { attribute_name } = req.body;
  const inserted_at = Utils.getTimeStamp();
  const updated_at = inserted_at;
  if (attribute_name === "")
    return res.status(400).json({ massage: "Please select an attribute name" });
  try {
    const response = await AttributesQuery.addAttribute(
      attribute_name,
      inserted_at,
      updated_at
    );
    const jsonObject = {
      massage: "success",
      results: {
        attribute_id: response.insertId,
        attribute_name: attribute_name,
      },
    };
    res.status(201).json(jsonObject);
  } catch (error) {
    res.status(500).json({ massage: "Internal Server Error" });
  }
});

routes.get("/product-attributes/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const attributes = [];
    const options = [];
    const attribute_response = await AttributesQuery.getAttributesById(id);
    console.log(attribute_response)
    attribute_response.map(item => {
      if (Utils.findInArray(attributes, item.attribute_id, "value") === -1) {
        attributes.push({
          value: item.attribute_id,
          label: item.attribute_name,
        });
      }
      if (Utils.findInArray(options, item.option_id, "value") === -1) {
        options.push({
          value: item.option_id,
          label: item.option_name,
        });
      }
    });
    const jsonObject = {
      massage: "Success",
      results: {
        options: options.length > 0 ? [...options] : null,
        attributes: attributes.length > 0 ? [...attributes] : null,
      },
    };

    res.status(200).json(jsonObject);
  } catch (error) {
    console.log(error)
    res.status(400).json({ massage: error.massage });
  }
});
// remove attribute/<id>
routes.delete("/attributes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await AttributesQuery.removeAttribute(id);
    const jsonObject = {
      massage: "Attribute has been removed",
    };
    if (response.affectedRows < 1) {
      return res.status(404).json({ massage: "Attribute is not found" });
    }
    res.status(200).json(jsonObject);
  } catch (error) {
    res.status(500).json({ massage: "Internal Server Error" });
  }
});

module.exports = routes;

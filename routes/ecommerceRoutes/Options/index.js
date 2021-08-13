const express = require("express");
const routes = express.Router();
const OptionsQuery = require("../../../Querry/Product/Options");
const Utils = require("../../../Utils/Utils");
// get options
routes.get("/options", async (req, res) => {
  try {
    const response = await OptionsQuery.getOptions();
    const jsonObject = {
      massage: "success",
      results: [...response],
    };
    res.status(200).json(jsonObject);
  } catch (error) {
    res.status(404).json({ massage: error.massage });
  }
});

// post options
routes.post("/option", async (req, res) => {
  const { attribute_id, option_name } = req.body;
  const inserted_at = Utils.getTimeStamp();
  const updated_at = inserted_at;
  try {
    const response = await OptionsQuery.addOption(
      attribute_id,
      option_name,
      inserted_at,
      updated_at
    );
    const jsonObject = {
      massage: "success",
      results: {
        option_id: response.insertId,
        attribute_id: attribute_id,
        option_name: option_name,
      },
    };
    res.status(201).json(jsonObject);
  } catch (error) {
    res.status(400).json({ massage: error.massage });
  }
});

// remove options/<id>
routes.delete("/options", async (req, res) => {
  const option_ids = req.query.option_ids || null;

  
  console.log(option_ids);
  try {
    const response = await OptionsQuery.removeOption([[option_ids]]);
    const jsonObject = {
      massage: "Option has been removed",
    };
    if (response.affectedRows < 1) {
      return res.status(404).json({ massage: "Option is not found" });
    }
    res.status(200).json(jsonObject);
  } catch (error) {
    console.log(error)
    res.status(404).json({ massage: error.massage });
  }
});
module.exports = routes;

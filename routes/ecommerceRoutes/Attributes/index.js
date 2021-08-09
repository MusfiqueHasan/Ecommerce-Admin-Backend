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
			const data = response.filter((item) => {
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
		res.status(400).json({ massage: error.massage });
	}
});

// post attribute
routes.post("/attribute", async (req, res) => {
	const { attribute_name } = req.body;
	const inserted_at = Utils.getTimeStamp();
	const updated_at = inserted_at;
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
		res.status(404).json({ massage: error.massage });
	}
});

routes.get("/attributes/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const response = await OptionsQuery.getOptionsById(id);
		if (response.length < 1) {
			return res.status(404).json({ massage: "Attribute is not found" });
		}
		const jsonObject = {
			massage: "success",
			results: [...response],
		};

		res.status(200).json(jsonObject);
	} catch (error) {
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
		res.status(404).json({ massage: error.massage });
	}
});

module.exports = routes;

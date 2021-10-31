const express = require("express");
const HTTPStatus = require("../../HTTPStatus");
const routes = express.Router();
const permissionQuery = require("../../Querry/permissionQuerry");
const { permissionSchema } = require("../../helpers/ValidationSchema/authSchema")

routes.get("/permission", async (req, res) => {
    try {
        const response = await permissionQuery.getAllPermissionData();
        const jsonObject = {
            massage: "success",
            results: response,
        }
        res.status(HTTPStatus.OK).json(jsonObject);
    } catch (error) {
        res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ massage: "INTERNAL SERVER ERROR"});
    }
});

routes.get("/permission/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await permissionQuery.getPermissionDataById(id);
        const jsonObject = {
            massage: "success",
            results: response,
        }
        res.status(HTTPStatus.OK).json(jsonObject);
    } catch (error) {
        res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ massage: "INTERNAL SERVER ERROR"});
    }
});

routes.post("/permission", async (req, res) => {
    const {
        user_id,
        routing_id,
        read_operation,
        update_operation,
        delete_operation
    } = await permissionSchema.validateAsync(req.body);

    const Read = read_operation.length === 4 ? true : false;
    const Update = update_operation.length === 4 ? true : false;
    const Delete = delete_operation.length === 4 ? true : false;

    const inputArray = [
        user_id,
        routing_id,
        Read,
        Update,
        Delete
    ];

    try {
        const response = await permissionQuery.createAPermission([inputArray]);
        const jsonObject = {
            id: response.insertId,
            user_id: user_id,
            routing_id: routing_id,
            read_operation: read_operation,
            update_operation: update_operation,
            delete_operation: delete_operation,
        };
        res.status(HTTPStatus.OK).json(jsonObject);
    } catch (error) {
        res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ massage: "INTERNAL SERVER ERROR"});
    }
});

routes.patch("/permission/:id", async (req, res) => {
    const { id } = req.params;
    const { user_id, routing_id, read_operation, update_operation, delete_operation } = req.body;

    const Read = read_operation.length === 4 ? true : false;
    const Update = update_operation.length === 4 ? true : false;
    const Delete = delete_operation.length === 4 ? true : false;

    if(!id) {
        return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ massage: "Id not found" });
    }

    const inputArray = [
        user_id,
        routing_id,
        Read,
        Update,
        Delete,
        id
    ];

    try {
        const response = await permissionQuery.updateAPermission(inputArray);
        res.status(HTTPStatus.OK).json({ status: "success" });
    } catch (error) {
        res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ massage: "INTERNAL SERVER ERROR"});
    }
});

routes.delete("/permission/:id", async (req, res) => {
    const { id } = req.params;

    if(!id) {
        return res
        .status(HTTPStatus.BAD_REQUEST)
        .json({ massage: "Id not found" });
    }

    try {
        const response = await permissionQuery.deleteAPermission(id);
        res.status(HTTPStatus.OK).json({ massage: "success" });
    } catch (error) {
        res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json({ massage: "INTERNAL SERVER ERROR"});
    }
});

module.exports = routes;
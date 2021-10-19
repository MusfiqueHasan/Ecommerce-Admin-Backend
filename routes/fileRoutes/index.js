const express = require("express");
const routes = express.Router();
const FilesQuery = require("../../Querry/Files/Files");
const Utils = require("../../Utils/Utils");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const HTTPStatus = require("../../HTTPStatus");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(path.resolve(__dirname, ".."));
    const dir = `/home/rat/Desktop/AllFiles/multikart/EcommerceAdminPanel/full-version/src/assets/uploads/`;
    const absPath = path.resolve(
      "/home/rat/Desktop/AllFiles/multikart/EcommerceAdminPanel/full-version/src/assets/",
      "../..",
      "uploads"
    );
    const exists = fs.existsSync(absPath);

    if (!exists) {
      fs.mkdirSync(absPath, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

routes.get("/files", async (req, res) => {
  try {
    const response = await FilesQuery.getFiles();
    const jsonData = {
      massage: "Success",
      results: [...response],
    };

    res.status(HTTPStatus.OK).json(jsonData);
  } catch (error) {
    console.log(error);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error" });
  }
});

routes.post("/file-upload", upload.single("file"), async (req, res) => {
  const { originalname, mimetype } = req.file;

  const inserted_at = Utils.getTimeStamp();
  const size = req.file.size;
  try {
    const response = await FilesQuery.insertFile(
      originalname,
      mimetype,
      inserted_at,
      size
    );
    const jsonData = {
      file_name: originalname,
      mime_type: mimetype,
      inserted_at: inserted_at,
      size: size,
      file_id: response.insertId,
    };
    res.status(HTTPStatus.OK).json(jsonData);
  } catch (error) {
    console.log(error);
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ msg: "Something Went Wrong" });
  }
});

routes.delete("/files/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await FilesQuery.removeFile(id);
    const jsonData = {
      massage: "Successfully Removed",
    };
    res.status(HTTPStatus.OK).json(jsonData);
  } catch (error) {
    console.log(error)
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ massage: "Internal Server Error" });
  }
});

module.exports = routes;

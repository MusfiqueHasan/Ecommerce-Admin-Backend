const express = require("express");
const routes = express.Router();
const FilesQuery = require("../../Querry/Files/Files");
const Utils = require("../../Utils/Utils");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
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

    console.log(dir);
    cb(null, dir);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

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
      file_id: response.insertId
    };
    res.status(200).json(jsonData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Something Went Wrong" });
  }
});

module.exports = routes;

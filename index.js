const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const createError = require("http-errors");
const { PORT } = require("./config");

const app = express();
const apis = require("./routes/allApiRoutes");
app.use(express.json({ type: "application/json" }));
app.use(express.urlencoded({ extended: true }));

const port = PORT || 5000;
app.use(cors());
app.use(apis);

app.use(async (req, res, next) => {
	const error = new Error("not found");
	error.status = 404;
	next(createError.NotFound("Page Doesn't Exist"));
});

app.use((err, req, res, next) => {
	res.status(err.status || 500).send({
		error: {
			status: err.status,
			message: err.message,
		},
	});
});
app.listen(port, () => {
	console.log(`server listening to port ${port}`);
});

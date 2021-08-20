const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const { PORT } = require("./config");
const authRoute = require("./Routes/Auth.route");
const ecommreceRoute = require('./Routes/Ecommrece.route')
const { verifyAccessToken } = require("./helper/jwt_helper/jwt_token");
require("./helper/redis/init_redis");
var cors = require('cors')
const app = express();

// const PORT = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", verifyAccessToken, async (req, res) => {
	res.send("Home route");
});

app.use("/auth", authRoute);
app.use('/ecommrece',ecommreceRoute);


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

app.listen(PORT, () => {
	console.log("server start in  port 5000");
});

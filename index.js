const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotEnv = require("dotenv");

const apis = require('./routes/allApiRoutes')

dotEnv.config({ path: "./.config.env" });

const app = express();

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 5000;
app.use(cors());
app.use(apis)

app.listen(port, () => {
  console.log(`server listening to port ${port}`);
});

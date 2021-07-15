const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {PORT} = require('./config')

const apis = require('./routes/allApiRoutes')

const app = express();

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
const port = PORT || 5000;
app.use(cors());
app.use(apis)

app.listen(port, () => {
  console.log(`server listening to port ${port}`);
});

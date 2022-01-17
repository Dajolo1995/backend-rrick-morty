const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const registerRoutes = require("./src/router/index")
const dotEnv = require("dotenv");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
dotEnv.config();

var PORT = process.env.PORT || 5000;

registerRoutes(app);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Api rest puesrto ${PORT}`));
});

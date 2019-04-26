const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const PORT = process.env.PORT || 8080;
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

const db = require("./models");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/", htmlRoutes);
app.use("/api", apiRoutes);
app.use(express.static("public"));

db.sequelize.sync({ force: true });

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});

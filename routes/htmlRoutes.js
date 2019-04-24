const express = require("express");
let router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log("INSIDE HTML ROUTES");
  next();
});

router.get("/", (req, res) => {
  res.render("index", {});
});

module.exports = router;
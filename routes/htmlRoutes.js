const express = require("express");
const db = require("../models/index");
let router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log("INSIDE HTML ROUTES");
  next();
});

router.get("/", (req, res) => {
  res.render("index", {});
});

router.get("/food", (req, res) => {
  db.FoodMenu.findAll({}).then(results => {
    res.render("food", {});
  });
});

module.exports = router;

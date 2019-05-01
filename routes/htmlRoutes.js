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
  res.render("food", {});
});

router.get("/food-menu", (req, res) => {
  db.FoodMenu.findAll({}).then(results => {
    res.render("display-food", { foodMenu: results });
  });
});

router.get("/drinks", (req, res) => {
  res.render("drinks", {});
});

router.get("/drink-menu", (req, res) => {
  db.DrinkMenu.findAll({}).then(results => {
    res.render("display-drink", { drinkMenu: results });
  });
});

router.get("/add-tables", (req, res) => {
  res.render("tables", {});
});

router.get("/tables", (req, res) => {
  db.Table.findAll({}).then(results => {
    res.render("display-tables", { tables: results });
  });
});

router.get("/system", (req, res) => {
  res.render("system", {});
});

router.get("/report", (req, res) => {
  res.render("report", {});
});

router.get("/categories", (req, res) => {
  res.render("categories", {});
});

module.exports = router;

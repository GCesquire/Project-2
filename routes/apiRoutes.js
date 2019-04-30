const express = require("express");
const db = require("../models/index");
let router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log("INSIDE API ROUTES");
  next();
});

router.get("/", (req, res) => {
  console.log("inside api routes");
});
//display all the restaurants
router.get("/restaurants", (req, res) => {
  db.Restaurant.findAll().then(results => {
    res.json(results);
  });
});
//add a new restaurant
router.post("/restaurants", (req, res) => {
  db.Restaurant.create({
    name: req.body.name,
    password: req.body.password
  }).then(results => {
    res.json(results);
  });
});

//display all the employees
router.get("/employees", (req, res) => {
  db.Waiter.findAll().then(results => {
    res.json(results);
  });
});

//add a new employee to the system
router.post("/employees", (req, res) => {
  db.Waiter.create({
    name: req.body.name,
    password: req.body.password
  }).then(results => {
    res.json(results);
  });
});

//display all categories
router.get("/categories", (req, res) => {
  db.Category.findAll().then(results => {
    res.json(results);
  });
});

//add a new Category
router.post("/categories", (req, res) => {
  db.Category.create({
    name: req.body.name
  }).then(results => {
    res.json(results);
  });
});

//update category
router.put('/categories', (req, res) => {
  db.Category.update(
    {name: req.body.name} ,
    {where: {id: req.body.id}}
  ).then(results => {
    res.json(results);
  });
});

//delete a category
router.delete('/categories', (req, res) => {
  db.Category.destroy({
    where: {
      id: req.body.id
    }
  }).then(results => {
    res.json(results);
  });
});

//get all the food items
router.get("/food", (req, res) => {
  db.FoodMenu.findAll({
    include: [db.Category]
  }).then(results => {
    res.json(results);
  });
});

//add a new food item
router.post("/food", (req, res) => {
  db.FoodMenu.create({
    name: req.body.name,
    wholesalePrice: parseFloat(req.body.wholesalePrice),
    retailPrice: parseFloat(req.body.retailPrice),
    stockQty: parseInt(req.body.stockQty),
    allergies: req.body.allergies,
    modifications: req.body.modifications
  }).then(results => {
    res.json(results);
  });
});

//get all the drinks
router.get("/drinks", (req, res) => {
  db.DrinkMenu.findAll({
    include: [db.Category]
  }).then(results => {
    res.json(results);
  });
});

//add a new drink item
router.post("/drinks", (req, res) => {
  db.DrinkMenu.create({
    name: req.body.name,
    wholesalePrice: parseFloat(req.body.wholesalePrice),
    retailPrice: parseFloat(req.body.retailPrice)
  }).then(results => {
    res.json(results);
  });
});

//get all the tables
router.get("/tables", (req, res) => {
  db.Table.findAll().then(results => {
    res.json(results);
  });
});

//add a new table
router.post("/tables", (req, res) => {
  db.Table.create({
    tableNumber: parseInt(req.body.tableNumber),
    guestQty: req.body.guestQty
  }).then(results => {
    res.json(results);
  });
});

module.exports = router;

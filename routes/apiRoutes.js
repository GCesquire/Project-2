const express = require("express");
const db = require("../models/index");
const session = require("express-session");
let router = express.Router();

router.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  const rest = db.Restaurants.findOne({ where: { email: username } });

  if (!rest) {
    res.status(404).json({ error: "we couldn't find a user with that email." });
  }

  // ideally you would be using bcrypt to hash/protect your passwords here
  if (password !== rest.password) {
    res
      .status(404)
      .json({ error: "we couldn't find a user with that email and password." });
  }

  req.session.rest = rest.id; // add restaraunt data into express-session cookie to be sent to FE

  res.status(200).end();
});

router.use(function timeLog(req, res, next) {
  console.log("INSIDE API ROUTES");
  next();
});

router.get("/", (req, res) => {
  console.log("inside api routes");
});
//display all the restaurants
router.get("/restaurants", (req, res) => {
  db.Restaurant.findAll({
    include: [db.Table]
  }).then(results => {
    res.json(results);
  });
});

router.get("/restaurants/:id", (req, res) => {
  db.Restaurant.findOne({
    where: {
      id: req.params.id
    },
    include: [db.Table]
  }).then(results => {
    res.json(results);
  });
});
//add a new restaurant
router.post("/restaurants", (req, res) => {
  db.Restaurant.create({
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
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
    name: req.body.name,
    password: req.body.password
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
  // var query = {};
  // if (req.query.restaurant_id) {
  //   query.RestaurantId = req.query.restaurant_id;
  // }
  db.Table.findAll({
    include: [db.Restaurant]
  }).then(results => {
    res.json(results);
  });
});

router.get("/tables/:id", function(req, res) {
  db.Table.findOne({
    where: {
      id: req.params.id
    },
    include: [db.Table]
  }).then(results => {
    res.json(results);
  });
});

//add a new table
router.post("/tables", (req, res) => {
  db.Table.create(
    {
      tableNumber: parseInt(req.body.tableNumber),
      guestQty: req.body.guestQty,
      RestaurantId: req.session.rest.id
    },
    { include: [db.Restaurant] }
  ).then(results => {
    res.json(results);
  });
});

//display all orders
router.get("/orders", (req, res) => {
  const query = {};
  if (req.query.table_id) {
    query.TableId = req.query.table_id;
  }
  db.Order.findAll({
    where: query,
    include: [db.Table]
  }).then(results => {
    res.json(results);
  });
});

//add a new order
router.post("/orders", (req, res) => {
  db.Order.create({
    item: req.body.item,
    itemQty: parseInt(req.body.itemQty),
    price: parseFloat(req.body.price)
  }).then(results => {
    res.json(results);
  });
});

module.exports = router;

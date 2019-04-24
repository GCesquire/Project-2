const express = require("express");
let router = express.Router();
router.use(function timeLog(req, res, next) {
  console.log("INSIDE API ROUTES");
  next();
});

router.get("/", (req, res) => {
  console.log("inside api routes");
});

module.exports = router;
``;

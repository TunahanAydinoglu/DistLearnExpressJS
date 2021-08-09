const express = require("express");
const cors = require("cors");

const restaurant = require("./restaurant");
const meal = require("./meal");
const order = require("./order");
const router = express.Router();

router.use(cors());
router.use("/restaurant", restaurant);
router.use("/meal", meal);
router.use("/order", order);

module.exports = router;

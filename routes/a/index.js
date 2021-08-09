const express = require("express");
const cors = require("cors");

const restaurant = require("./restaurant");
const meal = require("./meal");
const router = express.Router();

router.use(cors());
router.use("/restaurant", restaurant);
router.use("/meal", meal);


module.exports = router;

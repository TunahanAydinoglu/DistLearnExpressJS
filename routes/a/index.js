const express = require("express");
const cors = require("cors");

const restaurant = require("./restaurant");
const router = express.Router();

router.use(cors());
router.use("/restaurant", restaurant);

module.exports = router;

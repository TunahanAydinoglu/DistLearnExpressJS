const express = require("express");
const cors = require("cors");

const hotel = require("./hotel");
const country = require("./country");
const denne = require("./denne");
const router = express.Router();

router.use(cors());
router.use("/hotel", hotel);
router.use("/denne", denne);
router.use("/country", country);

module.exports = router;

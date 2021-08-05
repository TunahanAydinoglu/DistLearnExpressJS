const express = require("express");
const cors = require("cors");

const hotel = require("./hotel");
const router = express.Router();

router.use(cors());
router.use("/hotel", hotel);

module.exports = router;

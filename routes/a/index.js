const express = require("express");
const cors = require("cors");

const restaurant = require("./restaurant");
const meal = require("./meal");
const { addNewOrder } = require("../../controllers/a/Order");
const { getAccessToRoute } = require("../../middlewares/authorization/auth");
const { checkOrderAvailable } = require("../../middlewares/database/databaseErrorHelpers");
const router = express.Router();

router.use(cors());
router.use("/restaurant", restaurant);
router.use("/meal", meal);

router.post("/order",[getAccessToRoute,checkOrderAvailable], addNewOrder);

module.exports = router;

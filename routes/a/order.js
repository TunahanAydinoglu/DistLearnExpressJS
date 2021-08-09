const express = require("express");
const Order = require("../../models/amodels/Order");

const {
  checkRestaurantExist,
  checkUserExist,
  checkMealExist
} = require("../../middlewares/database/databaseErrorHelpers");

const {
    addNewOrder
} = require("../../controllers/a/order");

const {
  getAccessToRoute,
} = require("../../middlewares/authorization/auth");

const router = express.Router({ mergeParams: true });

router.post("/order", [getAccessToRoute, checkOrderAvailable], addNewOrder);

module.exports = router;

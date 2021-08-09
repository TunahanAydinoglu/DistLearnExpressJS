const express = require("express");
const Order = require("../../models/amodels/Order");

const {
  checkOrderAvailable
} = require("../../middlewares/database/databaseErrorHelpers");

const {
    addNewOrder
} = require("../../controllers/a/Order");

const {
  getAccessToRoute,
} = require("../../middlewares/authorization/auth");

const router = express.Router({ mergeParams: true });

router.post("/order", [getAccessToRoute, checkOrderAvailable], addNewOrder);

module.exports = router;

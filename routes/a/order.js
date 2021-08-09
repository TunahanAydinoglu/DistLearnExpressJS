const express = require("express");

const { checkOrderAvailable } = require("../../middlewares/database/databaseErrorHelpers");

const {
    addNewOrder
} = require("../../controllers/a/Order");

const {
  getAccessToRoute,
} = require("../../middlewares/authorization/auth");

const router = express.Router({ mergeParams: true });

router.use([getAccessToRoute, checkOrderAvailable]);

router.post("/order", addNewOrder);

module.exports = router;

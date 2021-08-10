const express = require("express");

const {
    addNewOrder,
    getOrdersByUserId
} = require("../../controllers/a/order");

const {
    getAccessToRoute,
} = require("../../middlewares/authorization/auth");

const router = express.Router({ mergeParams: true });

router.get("/", getAccessToRoute, getOrdersByUserId);
router.post("/", getAccessToRoute, addNewOrder);

module.exports = router;

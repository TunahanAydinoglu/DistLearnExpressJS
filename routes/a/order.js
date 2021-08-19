const express = require("express");

const {
    addNewOrder,
    getOrdersByUserId,
    getOrdersByUserIdForBulkOrders,
    addNewOrderBulkMethod
} = require("../../controllers/a/order");

const {
    getAccessToRoute,
} = require("../../middlewares/authorization/auth");

const router = express.Router({ mergeParams: true });

router.get("/", getAccessToRoute, getOrdersByUserId);
router.post("/", getAccessToRoute, addNewOrder);

router.get("/bulk", getAccessToRoute, getOrdersByUserIdForBulkOrders);
router.post("/bulk", getAccessToRoute, addNewOrderBulkMethod);
module.exports = router;

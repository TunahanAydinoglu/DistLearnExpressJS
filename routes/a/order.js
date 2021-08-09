const express = require("express");

const {
    addNewOrder
} = require("../../controllers/a/Order");

const {
    getAccessToRoute,
} = require("../../middlewares/authorization/auth");

const router = express.Router({ mergeParams: true });

router.post("/", getAccessToRoute, addNewOrder);

module.exports = router;

const express = require("express");

const {
    addNewDenne,
    updateDenneStatus
} = require("../../controllers/e/denne");

const {
    getAccessToRoute,
} = require("../../middlewares/authorization/auth");

const router = express.Router({ mergeParams: true });

router.post("/", getAccessToRoute, addNewDenne);
router.put("/:denneId", getAccessToRoute, updateDenneStatus);

module.exports = router;

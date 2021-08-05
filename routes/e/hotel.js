const express = require("express");
const Hotel = require("../../models/emodels/Hotel");

const {
  checkHotelExist
} = require("../../middlewares/database/databaseErrorHelpers");


const {
  getAccessToRoute,
} = require("../../middlewares/authorization/auth");

const {
  getAllHotels,
  getSingleHotel,
} = require("../../controllers/e/hotel");

const restaurantQueryMiddleware = require("../../middlewares/query/a/restaurantQueryMiddleware");

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  restaurantQueryMiddleware(Hotel, {
    population: {
      path: "user",
      select: "name",
    },
    population: {
      path: "country",
    },
  }),
  getAllHotels
);
router.get("/:id", checkHotelExist, getSingleHotel);

module.exports = router;

const express = require("express");
const Country = require("../../models/emodels/Country");

const {
  checkCountryExist
} = require("../../middlewares/database/databaseErrorHelpers");

const {
  getAccessToRoute,
} = require("../../middlewares/authorization/auth");

const {
  addNewCountry,
  getAllCountries,
} = require("../../controllers/e/country");

const {
  getHotelsByCountry,
  addNewHotel
} = require("../../controllers/e/hotel");

const restaurantQueryMiddleware = require("../../middlewares/query/a/restaurantQueryMiddleware");

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  restaurantQueryMiddleware(Country, {
    population: {
      path: "user",
      select: "name",
    },
    population: {
      path: "hotels",
    },
  }),
  getAllCountries
);
router.get("/:countryId/hotel", checkCountryExist, getHotelsByCountry);

router.post("/add", getAccessToRoute, addNewCountry);
router.post("/:countryId/hotel", getAccessToRoute, addNewHotel);

module.exports = router;

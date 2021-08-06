const express = require("express");
const Restaurant = require("../../models/amodels/Restaurant");

const {
  checkRestaurantExist
} = require("../../middlewares/database/databaseErrorHelpers");

const {
  addNewRestaurant,
  getAllRestaurant,
  getSingleRestaurant,
  getRestaurantByCuisine
} = require("../../controllers/a/restaurant");

const {
  getAccessToRoute,
} = require("../../middlewares/authorization/auth");
const {
  addNewMeal,
} = require("../../controllers/a/meal");

const restaurantQueryMiddleware = require("../../middlewares/query/a/restaurantQueryMiddleware");

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  restaurantQueryMiddleware(Restaurant, {
    population: {
      path: "user",
      select: "name",
    },
    population: {
      path: "meals",
    },
  }),
  getAllRestaurant
);
router.get("/:id", checkRestaurantExist, getSingleRestaurant);
router.get("/cuisine/:cuisine", getRestaurantByCuisine);

router.post("/", getAccessToRoute, addNewRestaurant);
router.post("/:restaurantId/meal", getAccessToRoute, addNewMeal);

module.exports = router;

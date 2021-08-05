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
  getLessonOwnerAccess,
} = require("../../middlewares/authorization/auth");

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

router.post("/add", getAccessToRoute, addNewRestaurant);

module.exports = router;

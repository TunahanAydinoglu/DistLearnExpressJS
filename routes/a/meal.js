const express = require("express");
const Meal = require("../../models/amodels/Meal");

const {
  checkMealExist
} = require("../../middlewares/database/databaseErrorHelpers");

const {
  getAllMeals,
  getSingleMeal
} = require("../../controllers/a/meal");

const {
  getAccessToRoute,
} = require("../../middlewares/authorization/auth");

const restaurantQueryMiddleware = require("../../middlewares/query/a/restaurantQueryMiddleware");
const Meal = require("../../models/amodels/Meal");

const router = express.Router({ mergeParams: true });

router.get(
  "/",
  restaurantQueryMiddleware(Meal, {
    population: {
      path: "user",
      select: "name",
    },
    population: {
      path: "ingredients",
    },
  }),
  getAllMeals
);
router.get("/:id", checkMealExist, getSingleMeal);

module.exports = router;
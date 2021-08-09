const Meal = require("../../models/amodels/Meal");

const errorWrapper = require("../../helpers/error/errorWrapper");
const CustomError = require("../../helpers/error/customError");

const getAllMeals = errorWrapper(async (req, res, next) => {
  return res.status(200).json(res.advanceQueryResults);
});

const addNewMeal = errorWrapper(async (req, res, next) => {
  const { restaurantId } = req.params;
  const information = req.body;
  const meal = await Meal.create({
    ...information,
    restaurant: restaurantId,
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    message: meal,
  });
});

const getSingleMeal = errorWrapper(async (req, res, next) => {
  const mealId = req.params.id || req.params.mealId;
  const meal = await Meal.findById(mealId).populate([{
    path: "user",
    select: "name",
  }]);

  res.status(200).json({
    success: true,
    data: meal,
  });
});

module.exports = {
  addNewMeal,
  getAllMeals,
  getSingleMeal
};

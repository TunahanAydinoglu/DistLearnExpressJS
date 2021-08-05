const Restaurant = require("../../models/amodels/Restaurant");

const errorWrapper = require("../../helpers/error/errorWrapper");
const CustomError = require("../../helpers/error/customError");

const getAllRestaurant = errorWrapper(async (req, res, next) => {
  return res.status(200).json(res.advanceQueryResults);
});

// const getAllLesson = errorWrapper(async (req, res, next) => {
//   const lessons = await Lesson.find().populate({
//     path:"comments",
//     select:"mark"
//   });

//   return res.status(200).json({
//     success: true,
//     data: lessons,
//   });
// });

const getRestaurantByCuisine = errorWrapper(async (req, res, next) => {
  const { cuisine } = req.params;
  const restaurants = await Restaurant.find({ cuisine: cuisine }).populate({
    path: "meals",
  });

  res.status(200).json({
    success: true,
    data: restaurants,
  });
});

const addNewRestaurant = errorWrapper(async (req, res, next) => {
  const information = req.body;
  const restaurant = await Restaurant.create({
    ...information,
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    message: restaurant,
  });
});

const getSingleRestaurant = errorWrapper(async (req, res, next) => {
  const restaurantId = req.params.id || req.params.restaurantId;
  const restaurant = await Restaurant.findById(restaurantId).populate([{
    path: "user",
    select: "name",
  },{
    path:"meals",
  }]);

  res.status(200).json({
    success: true,
    data: restaurant,
  });
});

module.exports = {
  addNewRestaurant,
  getAllRestaurant,
  getSingleRestaurant,
  getRestaurantByCuisine
};

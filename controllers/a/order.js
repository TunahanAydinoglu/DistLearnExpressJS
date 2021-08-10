const Order = require("../../models/amodels/Order");
const Meal = require("../../models/amodels/Meal");
const Restaurant = require("../../models/amodels/Restaurant");

const errorWrapper = require("../../helpers/error/errorWrapper");
const CustomError = require("../../helpers/error/customError");

const addNewOrder = errorWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const { restaurantId, mealId } = req.body;

    const meal = await Meal.findById(mealId);
    if (!meal) {
        return next(
            new CustomError(`Meal Not Found with Id : ${mealId}`, 404)
        );
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
        return next(
            new CustomError(`Restaurant Not Found with Id : ${restaurantId}`, 404)
        );
    }

    const order = await Order.create({
        meal: meal.id,
        restaurant: restaurant.id,
        user: userId,
    });

    res.status(200).json({
        success: true,
        message: order,
    });
});

const getOrdersByUserId = errorWrapper(async (req, res, next) => {
    const userId  = req.user.id;
    
    const orders = await Order.find({ user: userId }).populate([
        {
            path: "restaurant",
        },
        {
            path: "meal"
        }
    ]);

    res.status(200).json({
        success: true,
        data: orders,
    });
});

module.exports = {
    addNewOrder,
    getOrdersByUserId
};
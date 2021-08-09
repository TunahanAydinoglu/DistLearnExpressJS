const Order = require("../../models/amodels/Order");

const errorWrapper = require("../../helpers/error/errorWrapper");
const CustomError = require("../../helpers/error/customError");

const addNewOrder = errorWrapper(async (req, res, next) => {
    const { user, restaurant, meal } = req;

    const order = await Order.create({
        meal: meal.id,
        restaurant: restaurant.id,
        user: user.id,
    });

    res.status(200).json({
        success: true,
        message: meal,
    });
});

module.exports = {
    addNewOrder,
};

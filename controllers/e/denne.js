const Denne = require("../../models/emodels/Denne");
const Hotel = require("../../models/emodels/Hotel");

const errorWrapper = require("../../helpers/error/errorWrapper");
const CustomError = require("../../helpers/error/customError");

const addNewDenne = errorWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const { hotelId } = req.body;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
        return next(
            new CustomError(`Hotel Not Found with Id : ${hotelId}`, 404)
        );
    }

    const denne = await Denne.create({
        hotel: hotelId,
        user: userId,
    });

    res.status(200).json({
        success: true,
        message: denne,
    });
});

const updateDenneStatus = errorWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const { denneId } = req.params;
    const { isBooking } = req.body;

    const denneExist = await Denne.findById(denneId);
    if (!denneExist) {
        return next(
            new CustomError(`Hotel Not Found with Id : ${denneId}`, 404)
        );
    }

    const denne = await Denne.findByIdAndUpdate(denneId, { isBooking: isBooking }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: denne,
        message: "Updated!",
    });
});

module.exports = {
    addNewDenne,
    updateDenneStatus
};
const Hotel = require("../../models/emodels/Hotel");

const errorWrapper = require("../../helpers/error/errorWrapper");
const CustomError = require("../../helpers/error/customError");

const getAllHotels = errorWrapper(async (req, res, next) => {
  return res.status(200).json(res.advanceQueryResults);
});

const getHotelsByCountry = errorWrapper(async (req, res, next) => {
  const { countryId } = req.params;
  const hotels = await Hotel.find({ country: countryId }).populate({
    path: "country",
  });

  res.status(200).json({
    success: true,
    data: hotels,
  });
});

const addNewHotel = errorWrapper(async (req, res, next) => {
  const {countryId} = req.params;
  const information = req.body;
  const hotel = await Hotel.create({
    ...information,
    country: countryId,
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    message: hotel,
  });
});

const getSingleHotel = errorWrapper(async (req, res, next) => {
  const hotelId = req.params.id || req.params.restaurantId;
  const hotel = await Hotel.findById(hotelId).populate([{
    path: "user",
    select: "name",
  },{
    path:"country",
  }]);

  res.status(200).json({
    success: true,
    data: hotel,
  });
});

module.exports = {
  addNewHotel,
  getAllHotels,
  getHotelsByCountry,
  getSingleHotel,
};

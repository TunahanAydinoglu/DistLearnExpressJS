const Country = require("../../models/emodels/Country");

const errorWrapper = require("../../helpers/error/errorWrapper");
const CustomError = require("../../helpers/error/customError");

const getAllCountries = errorWrapper(async (req, res, next) => {
  return res.status(200).json(res.advanceQueryResults);
});

const addNewCountry = errorWrapper(async (req, res, next) => {
  const information = req.body;
  const restaurant = await Country.create({
    ...information,
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    message: restaurant,
  });
});

module.exports = {
  addNewCountry,
  getAllCountries,
};

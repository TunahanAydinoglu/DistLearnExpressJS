const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");
const Country = require("./Country");

const HotelSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    unique: true,
  },
  location: {
    type: String,
    required: [true, "Please provide a location"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  price: {
    type: String,
    required: [true, "Please provide a price"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please provide a imageUrl"],
  },
  star: {
    type: String,
    required: [true, "Please provide a star"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  country: {
    type: mongoose.Schema.ObjectId,
    ref: "Country",
    required: true,
  }
});

// Pre Save Method
HotelSchema.pre("save", async function (next) {
  if (!this.isModified("user")) {
    next();
  } else {
    try {
      let countryId = this.country;
      const country = await Country.findById(countryId);
      country.hotels.push(this.id);
      await country.save();
      next();
    } catch (err) {
      next(err);
    }
  }
});

module.exports = mongoose.model("Hotel", HotelSchema);

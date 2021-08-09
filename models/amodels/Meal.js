const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Restaurant = require("./Restaurant");

const MealSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please provide a imageUrl"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
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
  ingredients: [
    {
      type: String,
    },
  ],
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

// Pre Save Method
MealSchema.pre("save", async function (next) {
  if (!this.isModified("user")) {
    next();
  } else {
    try {
      let restaurantId = this.restaurant;
      const restaurant = await Restaurant.findById(restaurantId);
      restaurant.meals.push(this.id);
      await restaurant.save();
      next();
    } catch (err) {
      next(err);
    }
  }
});

MealSchema.post("remove", async function () {
  const restaurant = await Restaurant.findById(this.restaurant);

  restaurant.meals.splice(restaurant.meals.indexOf(this._id), 1);
  await restaurant.save();
});

module.exports = mongoose.model("Meal", MealSchema);

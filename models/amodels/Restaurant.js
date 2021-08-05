const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");
const Meal = require("./Meal.js");

const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    unique: true,
  },
  cuisine: {
    type: String,
    required: [true, "Please provide a cuisine"],
  },
  deliveryInfo: {
    type: String,
    required: [true, "Please provide a deliveryInfo"],
  },
  deliveryTime: {
    type: String,
    required: [true, "Please provide a deliveryTime"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please provide a imageUrl"],
  },
  address: {
    type: String,
    required: [true, "Please provide a address"],
  },
  district: {
    type: String,
    required: [true, "Please provide a district"],
  },
  minDeliveryFee: {
    type: String,
    required: [true, "Please provide a minDeliveryFee"],
  },
  paymentMethods: {
    type: String,
    required: [true, "Please provide a paymentMethods"],
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone"],
  },
  website: {
    type: String,
    required: [true, "Please provide a website"],
  },
  slug: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  meals: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Meal",
    },
  ]
});

// Pre Save Method
RestaurantSchema.pre("save", async function (next) {
  if (!this.isModified("name")) {
    next();
  } else {
    try {
      this.slug = this.makeSlug();
      next();
    } catch (err) {
      console.log(err);
    }
  }
});

RestaurantSchema.methods.makeSlug = function () {
  return slugify(this.name, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};

module.exports = mongoose.model("Restaurant", RestaurantSchema);

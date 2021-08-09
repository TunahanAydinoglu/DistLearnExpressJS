const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../User");

const OrderSchema = new Schema({
  createdDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  restaurant: {
    type: mongoose.Schema.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  meal: {
    type: mongoose.Schema.ObjectId,
    ref: "Meal",
    required: true,
  }
});

// Pre Save Method
OrderSchema.pre("save", async function (next) {
  if (!this.isModified("user")) {
    next();
  } else {
    try {
      let userId = this.user;
      const user = await User.findById(userId);
      user.orders.push(this.id);
      await user.save();
      next();
    } catch (err) {
      next(err);
    }
  }
});

OrderSchema.post("remove", async function () {
  const user = await User.findById(this.user);

  user.orders.splice(user.orders.indexOf(this._id), 1);
  await user.save();
});

module.exports = mongoose.model("Order", OrderSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../User");

const DenneSchema = new Schema({
  createdDate: {
    type: Date,
    default: Date.now,
  },
  hotel: {
    type: mongoose.Schema.ObjectId,
    ref: "Hotel",
    required: true,
  },
  isBooking: {
    type: Boolean,
    default: true,
  }
});

// Pre Save Method
DenneSchema.pre("save", async function (next) {
  if (!this.isModified("user")) {
    next();
  } else {
    try {
      let userId = this.user;
      const user = await User.findById(userId);
      user.dennes.push(this.id);
      await user.save();
      next();
    } catch (err) {
      next(err);
    }
  }
});

DenneSchema.post("remove", async function () {
  const user = await User.findById(this.user);

  user.dennes.splice(user.dennes.indexOf(this._id), 1);
  await user.save();
});

module.exports = mongoose.model("Denne", DenneSchema);

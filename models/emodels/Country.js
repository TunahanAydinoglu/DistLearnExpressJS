const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slugify = require("slugify");

const CountrySchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    unique: true,
  },
  imageUrl: {
    type: String,
    required: [true, "Please provide a imageUrl"],
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
  hotels: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Hotel",
    },
  ]
});

// Pre Save Method
CountrySchema.pre("save", async function (next) {
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

CountrySchema.methods.makeSlug = function () {
  return slugify(this.name, {
    replacement: "-",
    remove: /[*+~.()'"!:@]/g,
    lower: true,
  });
};

module.exports = mongoose.model("Country", CountrySchema);

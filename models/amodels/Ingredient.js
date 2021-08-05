const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Meal = require("./Meal");

const IngredientSchema = new Schema({
    ingredient: {
        type: String,
        required: [true, "Please provide a ingredient"],
    },
    includes: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    meal: {
        type: mongoose.Schema.ObjectId,
        ref: "Meal",
        required: true,
    },
});

// Pre Save Method
MealSchema.pre("save", async function (next) {
    if (!this.isModified("user")) {
        next();
    } else {
        try {
            let mealId = this.meal;
            const meal = await Meal.findById(mealId);
            meal.ingredients.push(this.id);
            await meal.save();
            next();
        } catch (err) {
            next(err);
        }
    }
});

MealSchema.post("remove", async function () {
    const meal = await Meal.findById(this.meal);

    meal.ingredients.splice(meal.ingredients.indexOf(this._id), 1);
    await meal.save();
});

module.exports = mongoose.model("Ingredient", IngredientSchema);

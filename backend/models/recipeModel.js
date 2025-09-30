const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true },
      },
    ],
    required: true,
  },
  instructions: {
    type: [String], // Array of steps
    required: true,
  },
  prepTime: {
    type: {
      hours: { type: Number, default: 0 },
      minutes: { type: Number, default: 0 },
    },
  },
  cuisineType: {
    type: String,
  },
  imageUrl: {
    type: String,
    default: "",
  },
});
const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;

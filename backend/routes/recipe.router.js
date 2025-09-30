const express = require("express");
const recipeController = require("../controllers/recipeControllers");

const recipeRouter = express.Router();

recipeRouter.post("/api/recipes", recipeController.createRecipe);
recipeRouter.get("/api/recipes", recipeController.getAllRecipes);
recipeRouter.get("/api/recipes/:id", recipeController.getRecipeById);
recipeRouter.put("/api/recipes/:id", recipeController.updateRecipeById);
recipeRouter.delete("/api/recipes/:id", recipeController.deleteRecipeById);

module.exports = recipeRouter;

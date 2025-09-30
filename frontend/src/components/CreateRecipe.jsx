import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CSS/style.CSS";
import Navbar from "./NavBar";

const CreateRecipe = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "", // ← add this
    ingredients: [{ name: "", quantity: "" }],
    instructions: [""],
    prepTime: { hours: 0, minutes: 0 },
    cuisineType: "",
  });

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][field] = value;
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: "", quantity: "" }],
    });
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = value;
    setFormData({ ...formData, instructions: updatedInstructions });
  };

  const addInstruction = () => {
    setFormData({ ...formData, instructions: [...formData.instructions, ""] });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3002/api/recipes", formData);
      navigate("/");
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-innerContainer">
        <div className="create-recipe-container">
          <h2>Add a New Recipe</h2>
          <form className="recipe-form" onSubmit={handleSubmit}>
            {/* Title */}
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              placeholder="Give recipe a title..."
              onChange={e =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            {/* Image Link */}
            <label>Image</label>
            <input
              type="text"
              value={formData.imageUrl}
              placeholder="Add Image Address..."
              onChange={e =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
            />
            {/* Ingredients */}
            <label>Ingredients</label>
            {formData.ingredients.map((ing, idx) => (
              <div key={idx} className="ingredient-row">
                <input
                  type="text"
                  placeholder="Name"
                  value={ing.name}
                  onChange={e =>
                    handleIngredientChange(idx, "name", e.target.value)
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Quantity"
                  value={ing.quantity}
                  onChange={e =>
                    handleIngredientChange(idx, "quantity", e.target.value)
                  }
                  required
                />
              </div>
            ))}
            <button type="button" className="pill-btn" onClick={addIngredient}>
              + Add Ingredient
            </button>

            {/* Instructions */}
            <label>Instructions</label>
            {formData.instructions.map((step, idx) => (
              <textarea
                key={idx}
                placeholder={`Step ${idx + 1}`}
                value={step}
                onChange={e => handleInstructionChange(idx, e.target.value)}
                required
              />
            ))}
            <button type="button" className="pill-btn" onClick={addInstruction}>
              + Add Step
            </button>

            {/* Prep Time */}
            <label>Prep Time</label>
            <div className="prep-row">
              <label htmlFor="hours">Hours:</label>
              <input
                type="number"
                id="hours"
                placeholder="Hours"
                min="0"
                value={formData.prepTime.hours}
                onChange={e =>
                  setFormData({
                    ...formData,
                    prepTime: { ...formData.prepTime, hours: e.target.value },
                  })
                }
              />
              <label htmlFor="minutes">Minutes:</label>
              <input
                type="number"
                id="minutes"
                placeholder="Minutes"
                min="0"
                value={formData.prepTime.minutes}
                onChange={e =>
                  setFormData({
                    ...formData,
                    prepTime: { ...formData.prepTime, minutes: e.target.value },
                  })
                }
              />
            </div>

            {/* Cuisine Type */}
            <label>Cuisine Type</label>
            <select
              value={formData.cuisineType}
              onChange={e =>
                setFormData({ ...formData, cuisineType: e.target.value })
              }>
              <option value="">Select a cuisine</option>
              <option value="Italian">Italian</option>
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="Mexican">Mexican</option>
              <option value="dessert">Dessert</option>
              <option value="french">French</option>
              <option value="other">Other</option>
            </select>

            {/* Buttons */}
            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/")}>
                Cancel
              </button>
              <button type="submit" className="gradient-btn">
                Save Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateRecipe;

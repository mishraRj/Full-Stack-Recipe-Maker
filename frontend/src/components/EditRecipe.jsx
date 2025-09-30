import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./CSS/style.CSS";
import Navbar from "./NavBar";

const EditRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "", // ← add this
    ingredients: [{ name: "", quantity: "" }],
    instructions: [""],
    prepTime: { hours: 0, minutes: 0 },
    cuisineType: "",
  });

  // Fetch existing recipe and prefill form
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/recipes/${id}`);
        const recipe = res.data;

        setFormData({
          title: recipe.title || "",
          imageUrl: recipe.imageUrl || "", // ← add this
          ingredients: recipe.ingredients?.length
            ? recipe.ingredients
            : [{ name: "", quantity: "" }],
          instructions: recipe.instructions?.length
            ? recipe.instructions
            : [""],
          prepTime: recipe.prepTime || { hours: 0, minutes: 0 },
          cuisineType: recipe.cuisineType || "",
        });
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipe();
  }, [id]);

  // Ingredient handlers
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

  // Instruction handlers
  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index] = value;
    setFormData({ ...formData, instructions: updatedInstructions });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [...formData.instructions, ""],
    });
  };

  // Submit update
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3002/api/recipes/${id}`, formData);
      navigate("/");
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-innerContainer">
        <div className="create-recipe-container">
          <h2>Update Recipe</h2>
          <form className="recipe-form" onSubmit={handleSubmit}>
            {/* Title */}
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
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
              <input
                type="number"
                placeholder="Hours"
                min="0"
                value={formData.prepTime.hours}
                onChange={e =>
                  setFormData({
                    ...formData,
                    prepTime: {
                      ...formData.prepTime,
                      hours: Number(e.target.value),
                    },
                  })
                }
              />
              <input
                type="number"
                placeholder="Minutes"
                min="0"
                value={formData.prepTime.minutes}
                onChange={e =>
                  setFormData({
                    ...formData,
                    prepTime: {
                      ...formData.prepTime,
                      minutes: Number(e.target.value),
                    },
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
                Update Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditRecipe;

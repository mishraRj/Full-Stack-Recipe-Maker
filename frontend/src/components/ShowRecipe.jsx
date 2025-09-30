import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./NavBar";

const ShowRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/recipes/${id}`);
        setRecipe(res.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  const handleDeletion = async () => {
    try {
      await axios.delete(`http://localhost:3002/api/recipes/${id}`);
      console.log("Recipe Deleted with name", recipe.title);
      navigate("/"); // better than full reload
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-innerContainer">
        <div className="show-recipe-container">
          <div className="show-recipe-header">
            <h1>{recipe.title}</h1>
            <Link to="/">
              <button className="back-btn">← Back to List</button>
            </Link>
          </div>

          <div className="recipe-image">
            <img src={recipe.imageUrl} alt={recipe.title} />
          </div>

          <div className="recipe-meta">
            <span>
              ⏱ {recipe.prepTime?.hours ? `${recipe.prepTime.hours}h ` : ""}
              {recipe.prepTime?.minutes ? `${recipe.prepTime.minutes}m` : ""}
            </span>
            <span>🌎 {recipe.cuisineType}</span>
          </div>

          <div className="recipe-details">
            <div>
              <h3>Ingredients</h3>
              <ul>
                {recipe.ingredients?.map((ing, i) => (
                  <li key={i}>
                    {ing.quantity} {ing.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Instructions</h3>
              <ol>
                {recipe.instructions?.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* ✅ Gradient Edit Button in marked area */}
          <div className="btns">
            <button
              className="edit-btn"
              onClick={() => navigate(`/edit-recipe/${id}`)}>
              ✏️ Edit Recipe
            </button>
            <button className="delete-btn" onClick={handleDeletion}>
              🗑 Delete Recipe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowRecipe;

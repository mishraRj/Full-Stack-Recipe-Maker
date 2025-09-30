import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./NavBar";
import "./CSS/style.css";

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
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the recipe "${recipe.title}"?`
    );

    if (!confirmDelete) return; // stop if user cancels

    try {
      await axios.delete(`http://localhost:3002/api/recipes/${id}`);
      console.log("Recipe Deleted with name", recipe.title);
      navigate("/"); // redirect after deletion
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
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
              <span style={{ color: "white" }}>
                ⏱ {recipe.prepTime?.hours ? `${recipe.prepTime.hours}h ` : ""}
                {recipe.prepTime?.minutes ? `${recipe.prepTime.minutes}m` : ""}
              </span>
              <span style={{ color: "white" }}>🌎 {recipe.cuisineType}</span>
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
      </div>
      <Footer />
    </>
  );
};

export default ShowRecipe;

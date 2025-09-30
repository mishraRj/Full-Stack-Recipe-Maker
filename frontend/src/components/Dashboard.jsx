import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import "./CSS/style.CSS";
import { Link } from "react-router-dom";
import Navbar from "./NavBar";

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/recipes");
        setRecipes(response.data); // assuming API returns array of recipe objects
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);
  // filtering logic
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCuisine =
      selectedCuisine === "" ||
      recipe.cuisineType?.toLowerCase().trim() ===
        selectedCuisine.toLowerCase().trim();

    return matchesSearch && matchesCuisine;
  });

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-innerContainer">
          {/* Header (already made before) */}
          <header className="dashboard-header">
            <input
              type="text"
              placeholder="Search for recipes..."
              className="search-bar"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <select
              className="cuisine-dropdown"
              onChange={e => setSelectedCuisine(e.target.value)}>
              <option value="">All Cuisines</option>
              <option value="italian">Italian</option>
              <option value="indian">Indian</option>
              <option value="chinese">Chinese</option>
              <option value="mexican">Mexican</option>
              <option value="dessert">Dessert</option>
              <option value="french">French</option>
              <option value="other">Other</option>
            </select>
            <Link to="/Create" className="add-recipe-btn">
              Add New Recipe
            </Link>
          </header>

          {/* Content */}
          <main className="dashboard-content">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe, index) => (
                <Link
                  key={index}
                  to={`/Show/${recipe._id}`}
                  className="cardLinks">
                  <Card
                    title={recipe.title}
                    imageUrl={recipe.imageUrl}
                    cuisineType={recipe.cuisineType}
                    prepTime={recipe.prepTime}
                  />
                </Link>
              ))
            ) : (
              <h1 style={{ color: "white" }}>No recipes found.</h1>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

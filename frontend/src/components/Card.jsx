import React from "react";
import "./CSS/style.CSS";

const Card = ({ title, imageUrl, cuisineType, prepTime }) => {
  // Format prepTime
  const timeText = `${prepTime?.hours > 0 ? prepTime.hours + " hr " : ""}${
    prepTime?.minutes ? prepTime.minutes + " min" : ""
  }`;

  return (
    <div className="recipe-card">
      {imageUrl ? (
        <div className="card-top2">
          <img src={imageUrl} alt={title} />
        </div>
      ) : (
        <div className="card-top">
          <h3>{title}</h3>
        </div>
      )}

      <div className="card-bottom">
        <h4>{title}</h4>
        <p className="details">
          {cuisineType} | {timeText}
        </p>
      </div>
    </div>
  );
};

export default Card;

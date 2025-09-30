import React from "react";
import "./CSS/About.css";
import Navbar from "./NavBar";
import Footer from "./Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="about-content">
          <h2>About Recipe Planet</h2>
          <p>
            Recipe Planet is a full-stack web application that allows users to
            explore, create, and share recipes from around the world. Whether
            you are a beginner cook or an experienced chef, you can easily find
            recipes by cuisine, ingredients, or preparation time. This platform
            was created by RJTV Universe to make cooking fun, interactive, and
            accessible for everyone. Enjoy cooking, sharing, and discovering new
            culinary delights!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;

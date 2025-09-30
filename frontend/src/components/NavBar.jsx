import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CSS/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="navbar-logo">
          <span role="img" aria-label="logo">
            🍴
          </span>{" "}
          <strong>Recipe Planet 🪐</strong>
        </div>
      </Link>

      {/* Hamburger icon */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✖" : "☰"}
      </div>

      <div className="right-side">
        <ul className={`navbar-links ${menuOpen ? "show" : ""}`}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
        </ul>

        <div
          className="navbar-profile"
          onClick={() => setShowTooltip(!showTooltip)}>
          U{showTooltip && <div className="profile-tooltip">Coming Soon!</div>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

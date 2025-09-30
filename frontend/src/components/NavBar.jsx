import React, { useState } from "react";
import "./CSS/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span role="img" aria-label="logo">
          🍴
        </span>{" "}
        <strong>Recipe Planet</strong>
      </div>

      {/* Hamburger icon - only visible on small screens */}
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

        <div className="navbar-profile">U</div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import "./CSS/footer.css";
import {
  FaTelegramPlane,
  FaGithub,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section logo-section">
          <h3>Recipe Planet</h3>
          <p>Cook. Share. Enjoy.</p>
        </div>

        <div className="footer-section links-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/support">Support</a>
            </li>
            <li>
              <a href="/terms">Terms of Use</a>
            </li>
          </ul>
        </div>

        <div className="footer-section social-section">
          <h4>Follow Me</h4>
          <div className="social-icons">
            <a
              href="https://t.me/the_king_of_pirates123"
              target="_blank"
              rel="noreferrer">
              <FaTelegramPlane />
            </a>
            <a
              href="https://github.com/mishraRj"
              target="_blank"
              rel="noreferrer">
              <FaGithub />
            </a>
            <a
              href="https://www.instagram.com/rajatmishra2003/"
              target="_blank"
              rel="noreferrer">
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/mishrarj/"
              target="_blank"
              rel="noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Recipe Planet. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

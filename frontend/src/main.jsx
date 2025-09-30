import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ProjectRoutes from "./Routes.jsx";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Router>
    <ProjectRoutes />
  </Router>
);

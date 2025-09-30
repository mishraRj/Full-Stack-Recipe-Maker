import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

// Pages List
import Dashboard from "./components/Dashboard";
import CreateRecipe from "./components/CreateRecipe";
import ShowRecipe from "./components/ShowRecipe";
import EditRecipe from "./components/EditRecipe";

const ProjectRoutes = () => {
  let elements = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/Create",
      element: <CreateRecipe />,
    },
    {
      path: "/Show/:id",
      element: <ShowRecipe />,
    },
    {
      path: "/edit-recipe/:id",
      element: <EditRecipe />,
    },
    {
      path: "*",
      element: <Dashboard />,
    },
  ]);

  return elements;
};

export default ProjectRoutes;

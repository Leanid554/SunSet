import React from "react";
import { Route, Navigate } from "react-router-dom";
import { getRole } from "../pages/Login/TokenUtils"; // Adjust the import path to your utils

const ProtectedRoute = ({ element, ...rest }) => {
  const role = getRole(); // Get the role from sessionStorage

  if (role !== "administrator") {
    // If user is not an administrator, redirect to main page
    return <Navigate to="/main" replace />;
  }

  // If user is an administrator, render the element (AdminPage)
  return element; // Directly return the element
};

export default ProtectedRoute;

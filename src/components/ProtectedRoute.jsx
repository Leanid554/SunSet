import React from "react";
import { Route, Navigate } from "react-router-dom";
import { getRole } from "../pages/Login/TokenUtils";

const ProtectedRoute = ({ element, ...rest }) => {
  const role = getRole();

  if (role !== "administrator") {
    return <Navigate to="/main" replace />;
  }
  return element;
};

export default ProtectedRoute;

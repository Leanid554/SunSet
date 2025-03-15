import React from "react";
import { useLocation, Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import "./index.scss";
import { getRole } from "../../pages/Login/TokenUtils";

export default function Navbar() {
  const location = useLocation();
  const role = getRole(); // Get the role from sessionStorage

  return (
    <nav className="navbar">
      <Link to="/main">
        <div className="navbar_logo">
          <img src={Logo} alt="Logo" />
        </div>
      </Link>

      {location.pathname !== "/login" && location.pathname !== "/admin" && (
        <div className="position">{role}</div>
      )}

      {/* Show the Admin Panel button only if the role is 'administrator' */}
      {role === "administrator" && location.pathname !== "/admin" && (
        <Link to="/admin" className="admin-button">
          Admin Panel
        </Link>
      )}
    </nav>
  );
}

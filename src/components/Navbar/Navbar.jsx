import React from "react";
import { useLocation, Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import "./index.scss";

export default function Navbar() {
  const location = useLocation();

  const userRole = sessionStorage.getItem("role");
  const email = sessionStorage.getItem("email");

  return (
    <nav className="navbar">
      <Link to="/main">
        <div className="navbar_logo">
          <img src={Logo} alt="Logo" />
        </div>
      </Link>

      {location.pathname !== "/login" &&
        location.pathname !== "/admin" &&
        userRole && (
          <div className="position-navbar">
            <div className="role">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </div>
            <div className="email">{email}</div>
          </div>
        )}

      {userRole === "administrator" && location.pathname !== "/admin" && (
        <Link to="/admin" className="admin-button">
          Admin Panel
        </Link>
      )}
    </nav>
  );
}

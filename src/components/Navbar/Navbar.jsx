import React from "react";
import { useLocation, Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import "./index.scss";

export default function Navbar() {
  const location = useLocation();

  // Получаем роль из sessionStorage
  const userRole = sessionStorage.getItem("role");

  return (
    <nav className="navbar">
      <Link to="/main">
        <div className="navbar_logo">
          <img src={Logo} alt="Logo" />
        </div>
      </Link>

      {location.pathname !== "/login" && location.pathname !== "/admin" && (
        <div className="position">{userRole}</div>
      )}

      {/* Кнопка "Admin Panel" отображается, если роль = admin */}
      {userRole === "administrator" && location.pathname !== "/admin" && (
        <Link to="/admin" className="admin-button">
          Admin Panel
        </Link>
      )}
    </nav>
  );
}

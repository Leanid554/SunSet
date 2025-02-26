import React from "react";
import { useLocation, Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";
import "./index.scss";

export default function Navbar({ count }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar_logo">
        <img src={Logo} alt="Logo" />
        <p className="visit-counter">count: {count}</p>
      </div>

      {/* Отображаем "Call-Center", если не на странице логина */}
      {location.pathname !== "/login" && (
        <div className="position">Call-Center</div>
      )}

      {/* Кнопка "Admin Panel" (не отображается на странице админа) */}
      {location.pathname !== "/admin" && (
        <Link to="/admin" className="admin-button">Admin Panel</Link>
      )}
    </nav>
  );
}

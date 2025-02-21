import React from "react";
import { useLocation } from "react-router-dom";
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
      
      {location.pathname !== "/login" && (
        <div className="position">Call-Center</div>
      )}
    </nav>
  );
}

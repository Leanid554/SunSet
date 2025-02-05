import React from "react";
import Logo from "../../assets/img/logo.png";
import "./index.scss"

export default function Navbar({ count }) {
  return (
    <nav className="navbar">
      <div className="navbar_logo">
        <img src={Logo} alt="Logo" />
      </div>
      <p className="visit-counter">count: {count}</p>
    </nav>
  );
}

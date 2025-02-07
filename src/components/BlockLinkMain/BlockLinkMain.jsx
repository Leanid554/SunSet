import React from "react";
import { Link } from "react-router-dom";
import "./index.scss"; // Импортируем стили

const BlockLink = ({ title, path, isEnabled }) => (
  <div className="block-link">
    <Link to={isEnabled ? path : "#"} className={`block-button ${!isEnabled ? 'disabled' : ''}`}>
      <div className="video-content-link">
        <h3>{title}</h3>
      </div>
    </Link>
  </div>
);

export default BlockLink;

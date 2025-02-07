import React from "react";
import { Link } from "react-router-dom";
import "./index.scss"; // Импортируем стили

const BlockLink = ({ title, path, progress, isEnabled }) => (
  <div className="block-link">
    <Link to={isEnabled ? path : "#"} className={`block-button ${!isEnabled ? 'disabled' : ''}`}>
      <div className="video-content-link">
        <h3>{title}</h3>
        {progress !== undefined && (
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </Link>
  </div>
);

export default BlockLink;

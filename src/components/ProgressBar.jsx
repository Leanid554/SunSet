// src/components/ProgressBar.jsx

import React from "react";
import "./ProgressBar.scss";

function ProgressBar({ progress }) {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }} />
    </div>
  );
}

export default ProgressBar;

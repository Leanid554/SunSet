import React from "react";
import { Link } from "react-router-dom";

const BlockItem = ({ block, blockProgress = 0, isEnabled = true }) => {
  const userId = localStorage.getItem("userId");
  const blockPath = block.path || `/lectures/${userId}/block/${block.id}`;

  return (
    <Link
      to={isEnabled ? blockPath : "#"}
      className={`block-item ${isEnabled ? "" : "disabled"}`}
      onClick={(e) => {
        if (!isEnabled) {
          e.preventDefault();
          alert("Blok jest zamknięty🔒");
        }
      }}
      title={isEnabled ? `Przejdź do ${block.title}` : "Blok jest zamknięty 🔒"}
    >
      <div className="block-content">
        <div className="block-row">
          <div className="block-title">{block.title}</div>
          <div className="block-progress-bar-container">
            <div className="block-progress-bar">
              <div
                className="progress completed"
                style={{ width: `${blockProgress}%` }}
              ></div>
              <div
                className="progress remaining"
                style={{ width: `${100 - blockProgress}%` }}
              ></div>
            </div>
          </div>
          <span className="progress-text">{blockProgress}%</span>
          <span className="dostep-text">{isEnabled ? "🔓" : "🔒"}</span>
        </div>
      </div>
    </Link>
  );
};

export default BlockItem;

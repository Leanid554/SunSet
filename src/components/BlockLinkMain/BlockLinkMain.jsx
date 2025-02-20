import React from "react";
import { Link } from "react-router-dom";
import BlockInfo from "../BlockInfo/BlockInfo"; 
import './index.scss';

const BlockLink = ({ title, path, isEnabled, videosData }) => {
  return (
    <div className="block-link">
      {isEnabled ? (
        <Link to={path} className="block-button">
          <div className="block-content">
            <h3>{title}</h3>
            <BlockInfo videosData={videosData} />
          </div>
        </Link>
      ) : (
        <div className="blocked-button">
          <div className="block-content">
            <h3>{title} (Blocked)</h3>
            <BlockInfo videosData={videosData} />
            <p>Progress in the previous block is not 100%. This block is locked.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockLink;

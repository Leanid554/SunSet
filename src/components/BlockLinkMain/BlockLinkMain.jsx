import React from "react";
import { Link } from "react-router-dom";
import BlockInfo from "../BlockInfo/BlockInfo"; 
import "./index.scss";

const BlockLink = ({ title, path, isEnabled, videosData }) => (
  <div className="block-link">
    <Link to={isEnabled ? path : "#"} className={`block-button ${!isEnabled ? 'disabled' : ''}`}>
      <div className="block-content">
        <h3>{title}</h3>
        <BlockInfo videosData={videosData} /> 
      </div>
    </Link>
  </div>
);

export default BlockLink;

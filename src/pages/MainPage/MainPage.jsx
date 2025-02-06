import React from "react";
import { Link } from "react-router-dom";
import "./index.scss"; 

const BlockLink = ({ title, path }) => (
  <div className="block-link">
    <Link to={path} className="block-button">
      {title}
    </Link>
  </div>
);

function MainPage() {
  return (
    <div className="main-page">
      <div className="block-container">
      <BlockLink title="Block 1" path="/block/1" />
      <BlockLink title="Block 2" path="/block/2" />

      </div>

      
    </div>
  );
}

export default MainPage;

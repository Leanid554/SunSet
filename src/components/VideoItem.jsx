// src/components/VideoItem.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./VideoItem.scss";


const VideoItem = ({ id, title, progress }) => {
  return (
    <Link to={`/video/${id}`} className="video-item">
      <h3>{title}</h3>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </Link>
  );
};

export default VideoItem;

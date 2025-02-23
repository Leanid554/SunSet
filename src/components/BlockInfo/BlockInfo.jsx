import React from "react";
import './index.scss';

const BlockInfo = ({ videosData }) => {
  const totalProgress = videosData.reduce((acc, video) => acc + video.progress, 0);
  const averageProgress = totalProgress / videosData.length;

  return (
    <div className="block-info">
      <div className="main-page-progress-bar">
        <div className="main-page-progress" style={{ width: `${averageProgress}%` }}></div>
      </div>
    </div>
  );
};

export default BlockInfo;

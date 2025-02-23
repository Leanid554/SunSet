import React from "react";
import { Link } from "react-router-dom";
import videosData from "../../data/videosData";
import BlockItem from "../../components/Main/BlockItem";
import progressData from "../../data/progressData"; 
import './index.scss';
const calculateBlockProgress = (videos) => {
  if (videos.length === 0) return 0;

  const totalProgress = videos.reduce((acc, video) => acc + video.progress, 0);
  return Math.round(totalProgress / videos.length); 
};

function MainPage() {
  const checkIfEnabled = (blockId) => {
    if (blockId === 1) return true; 
    const prevBlockData = videosData[progressData[blockId - 1].prevBlockId] || [];
    const prevBlockProgress = calculateBlockProgress(prevBlockData);
    return prevBlockProgress === 100; 
  };

  return (
    <div className="main-page">
      <div className="block-container">
        <div className="block-header-row">
          <div className="block-label">nazwa</div>
          <div className="progress-label">progresja</div>
          <div className="percentage-label">procent</div>
          <div className="dostep-label">dostep</div>
        </div>

        {progressData.map((block, index) => {
          const blockVideosData = videosData[block.blockId] || [];
          const isEnabled = checkIfEnabled(block.blockId);
          const blockProgress = calculateBlockProgress(blockVideosData);

          return (
            <BlockItem
              key={index}
              block={block}
              blockProgress={blockProgress}
              isEnabled={isEnabled}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;

import React from "react";
import { Link } from "react-router-dom";
import videosData from "../../components/videosData/videosData";
import './index.scss';

// Function to calculate the block progress based on the video progress
const calculateBlockProgress = (videos) => {
  if (videos.length === 0) return 0; // If there are no videos, the progress is 0

  // Sum the progress of all videos and calculate their average progress
  const totalProgress = videos.reduce((acc, video) => acc + video.progress, 0);
  return Math.round(totalProgress / videos.length); // Return the average block progress
};

function MainPage() {
  // Data for each block
  const progressData = [
    { title: "Wprowadzenie", path: "/block/1", blockId: 1, prevBlockId: null },
    { title: "Podstawy rozmowy", path: "/block/2", blockId: 2, prevBlockId: 1 },
    { title: "Klienty i typy ", path: "/block/3", blockId: 3, prevBlockId: 2 },
    { title: "Jak podac informacje ", path: "/block/4", blockId: 4, prevBlockId: 3 },
    { title: "zamknięcie transakcji", path: "/block/5", blockId: 5, prevBlockId: 4 }, // New block
  ];

  const checkIfEnabled = (blockId) => {
    if (blockId === 1) return true; // Block 1 is always available
    const prevBlockData = videosData[progressData[blockId - 1].prevBlockId] || [];
    const prevBlockProgress = calculateBlockProgress(prevBlockData); // Get the progress of the previous block
    return prevBlockProgress === 100; // The block is available if the previous block is 100% complete
  };

  return (
    <div className="main-page">
      <div className="block-container">
        {/* Headings that should be at the top */}
        <div className="block-header-row">
          <div className="block-label">nazwa</div>
          <div className="progress-label">progresja</div>
          <div className="percentage-label">procent</div>
          <div className="dostep-label">dostep</div>
        </div>

        {progressData.map((block, index) => {
          const blockVideosData = videosData[block.blockId] || [];
          const isEnabled = checkIfEnabled(block.blockId);
          const blockProgress = calculateBlockProgress(blockVideosData); // Calculate the block progress

          return (
            <Link to={isEnabled ? block.path : "#"} key={index} className={`block-item ${isEnabled ? "" : "disabled"}`}>
              <div className="block-content">
                {/* Data for each block */}
                <div className="block-row">
                  <div className="block-title">{block.title}</div>
                  <div className="block-progress-bar-container">
                    <div className="block-progress-bar">
                      <div
                        className="progress completed"
                        style={{ width: `${blockProgress}%` }} // Filling the green part
                      ></div>
                      <div
                        className="progress remaining"
                        style={{ width: `${100 - blockProgress}%` }} // Filling the gray part
                      ></div>
                    </div>
                  </div>
                  <span className="progress-text">{blockProgress}%</span>
                  <span className="dostep-text">{isEnabled ? "🔓" : "🔒"}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;

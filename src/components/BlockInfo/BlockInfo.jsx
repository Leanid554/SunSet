import React from 'react';
import './index.scss';

const BlockInfo = ({ videosData }) => {
  const calculateProgress = (videosData) => {
    let completedVideos = 0;
    let totalVideos = 0;
    let completedTests = 0;
    let totalTests = 0;

    videosData.forEach((video) => {
      if (video.progress === 100) {
        completedVideos += 1;
      }
      totalVideos += 1;
    });

    videosData.forEach((video) => {
      if (video.id === 51 || video.id === 52 || video.id === 53 || video.id === 54) {
        if (video.progress === 100) {
          completedTests += 1;
        }
        totalTests += 1;
      }
    });

    const totalItems = totalVideos + totalTests;
    const completedItems = completedVideos + completedTests;
    return (completedItems / totalItems) * 100;
  };

  const progress = calculateProgress(videosData);

  return (
    <div className="block-info">
      <div className="progress-bar">
        <div
          className="progress-block-info"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p>Progress: {Math.round(progress)}%</p>
    </div>
  );
};

export default BlockInfo;

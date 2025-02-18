// components/BlockInfo/BlockInfo.jsx

import React from "react";
import './index.scss';

const BlockInfo = ({ videosData }) => {
  // Вычисляем общий прогресс блока (средний прогресс всех видео)
  const totalProgress = videosData.reduce((acc, video) => acc + video.progress, 0);
  const averageProgress = totalProgress / videosData.length;

  return (
    <div className="block-info">
      {/* Показываем только одну общую полосу прогресса */}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${averageProgress}%` }}></div>
      </div>
    </div>
  );
};

export default BlockInfo;

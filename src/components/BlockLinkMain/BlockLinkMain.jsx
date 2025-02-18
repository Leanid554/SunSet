import React from "react";
import { Link } from "react-router-dom";
import BlockInfo from "../BlockInfo/BlockInfo"; // Компонент для информации о видео
import './index.scss';

const calculateBlockProgress = (videosData) => {
  // Вычисляем общий прогресс блока (средний прогресс всех видео)
  const totalProgress = videosData.reduce((acc, video) => acc + video.progress, 0);
  return totalProgress / videosData.length;
};

const BlockLink = ({ title, path, isEnabled, videosData }) => {
  const blockProgress = calculateBlockProgress(videosData); // Вычисляем общий прогресс блока

  return (
    <div className="block-link">
      {isEnabled ? (
        <Link to={path} className="block-button">
          <div className="block-content">
            <h3>{title}</h3>

            {/* Полоса прогресса блока */}
            <div className="block-progress">
              <div className="progress-bar">
                <div className="progress" style={{ width: `${blockProgress}%` }}></div>
              </div>
            </div>

            {/* Отображаем только общую полосу прогресса */}
            <BlockInfo videosData={videosData} />
          </div>
        </Link>
      ) : (
        <div className="blocked-button">
          <div className="block-content">
            <h3>{title} (Blocked)</h3>
            <div className="block-progress">
              <div className="progress-bar">
                <div className="progress" style={{ width: `${blockProgress}%` }}></div>
              </div>
            </div>
            {/* Сообщение о заблокированности */}
            <p>Progress in the previous block is not 100%. This block is locked.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockLink;

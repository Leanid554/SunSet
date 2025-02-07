// components/BlockInfo.jsx
import React from 'react';

const BlockInfo = ({ videosData }) => {
  // Функция для вычисления прогресса блока
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

    // Подсчитываем тесты
    videosData.forEach((video) => {
      if (video.id === 51 || video.id === 52 || video.id === 53 || video.id === 54) {
        if (video.progress === 100) {
          completedTests += 1;
        }
        totalTests += 1;
      }
    });

    // Вычисляем общий прогресс: (выполненные видео + выполненные тесты) / (всего видео + всего тестов)
    const totalItems = totalVideos + totalTests;
    const completedItems = completedVideos + completedTests;
    return (completedItems / totalItems) * 100;
  };

  const progress = calculateProgress(videosData);

  return (
    <div className="block-info">
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p>Progress: {Math.round(progress)}%</p>
    </div>
  );
};

export default BlockInfo;

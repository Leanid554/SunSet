// src/components/Block2.jsx

import React from "react";
import { Link } from "react-router-dom";
import VideoItem from "./VideoItem"; // Импортируем компонент VideoItem
import "./Block2.scss"; // Путь к стилям

const videosBlock2 = [
  { id: 1, title: "Video 3", progress: 45 },
  { id: 2, title: "Video 4", progress: 70 },
  { id: 3, title: "Video 5", progress: 25 },
  { id: 4, title: "Video 6", progress: 95 },
  { id: 5, title: "Video 7", progress: 50 },
];

function Block2() {
  return (
    <div className="block-container">
      {/* Кнопка "Main" в левом верхнем углу, ведет на главную страницу */}
      <div className="main-button">
        <Link to="/main" className="main-link">Main</Link>
      </div>

      {/* Список видео */}
      <div className="video-list">
        {videosBlock2.map((video) => (
          <VideoItem key={video.id} title={video.title} progress={video.progress} />
        ))}
      </div>

      {/* Кнопка для возврата на главную страницу */}
      <div className="back-to-main">
        <Link to="/main" className="back-button">Вернуться к выбору блока</Link>
      </div>
    </div>
  );
}

export default Block2;

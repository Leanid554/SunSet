// src/components/Block1.jsx
import React from "react";
import { Link } from "react-router-dom";
import VideoItem from "./VideoItem"; // Импортируем компонент VideoItem
import "./Block1.scss"; // Путь к стилям

const videosBlock1 = [
  { id: 1, title: "Video 1", progress: 50 },
  { id: 2, title: "Video 2", progress: 80 },
  { id: 3, title: "Video 3", progress: 20 },
  { id: 4, title: "Video 4", progress: 100 },
  { id: 5, title: "Video 5", progress: 60 },
];

function Block1() {
  return (
    <div className="block-container">
      {/* Кнопка "Main" в левом верхнем углу, ведет на главную страницу */}
      <div className="main-button">
        <Link to="/main" className="main-link">Main</Link>
      </div>

      {/* Список видео */}
      <div className="video-list">
        {videosBlock1.map((video) => (
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

export default Block1;

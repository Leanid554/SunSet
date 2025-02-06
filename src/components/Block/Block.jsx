import React from "react";
import { Link } from "react-router-dom";
import "./Block1.scss"; 

function Block1({ videos, mainPath = "/main" }) {
  return (
    <div className="block-container">
      {/* Кнопка "Main" */}
      <div className="main-button">
        <Link to={mainPath} className="main-link">Main</Link>
      </div>

      {/* Список видео */}
      <div className="video-list">
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            <Link to={`/video/${video.id}`} className="video-link">
              <h3>{video.title}</h3>
              {/* Прогресс-бар */}
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${video.progress}%` }}
                ></div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Кнопка возврата */}
      <div className="back-to-main">
        <Link to={mainPath} className="back-button">Вернуться к выбору блока</Link>
      </div>
    </div>
  );
}

export default Block1;

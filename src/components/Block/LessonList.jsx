import React from "react";
import { Link } from "react-router-dom";
import "./Block1.scss";

function LessonList({ lessons, onLectureClick }) {
  return (
    <div className="block-container block-height">
      <div className="block-header-row">
        <div className="block-label">Название</div>
        <div className="position-label">Позиция</div>
        <div className="progress-label">Прогресс</div>
        <div className="access-label">Доступ</div>
      </div>

      <div className="video-list-container">
        {lessons.map((video) => (
          <div key={video.id} className="video-item-wrapper">
            <Link
              to={`/video/${video.id}`}
              className="video-item"
              onClick={() => onLectureClick(video)}
            >
              <div className="video-content">
                <div className="block-row">
                  <div className="block-title">{video.title}</div>
                  <div className="position1">{video.position || "Call-Center"}</div>
                  <span className="progress-text">{video.progress}%</span>
                  <span className="access-text">{video.progress === 100 ? "🔓" : "🔒"}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LessonList;

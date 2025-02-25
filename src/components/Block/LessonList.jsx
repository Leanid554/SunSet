import React from "react";
import { Link } from "react-router-dom";
import "./Block1.scss";

function LessonList({ lessons, onLectureClick }) {
  return (
    <div className="block-container block-height">
      <div className="block-header-row">
        <div className="block-label">nazwa</div>
        <div className="position-label">stanowisko</div>
        <div className="progress-label">procent</div>
        <div className="access-label">dostęp</div>
      </div>

      <div className="video-list-container">
        {lessons.map((video, index) => {
          const previousLesson = lessons[index - 1];
          const isDisabled = previousLesson && previousLesson.progress < 100;

          return (
            <div key={video.id} className="video-item-wrapper">
              <Link
                to={`/video/${video.id}`}
                className={`video-item ${isDisabled ? "disabled" : ""}`}
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
          );
        })}
      </div>
    </div>
  );
}

export default LessonList;

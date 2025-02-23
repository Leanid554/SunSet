import React from "react";
import { Link } from "react-router-dom";
import "./Block1.scss";

function Block({ videos, mainPath = "/main" }) {
  // Разделение видео на уроки и тесты
  const lessons = videos.filter(video => video.id < 51 || video.id > 55);
  const tests = videos.filter(video => video.id >= 51 && video.id <= 55);

  return (
    <div>
      {/* Контейнер с уроками */}
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
            const isDisabled = previousLesson && previousLesson.progress < 100; // 🔒 Блокируем, если предыдущий не пройден

            return (
              <div key={video.id} className="video-item-wrapper">
                <Link to={`/video/${video.id}`} className={`video-item ${isDisabled ? "disabled" : ""}`}>
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

      {/* Контейнер с тестами (разблокируются, если все уроки пройдены) */}
      <div className="test-container">
        {tests.map((test) => {
          const allLessonsCompleted = lessons.every(lesson => lesson.progress === 100);
          const isTestDisabled = !allLessonsCompleted; // 🔒 Блокируем тест, если не все уроки пройдены

          return (
            <div key={test.id} className="video-item-wrapper">
              <Link to={`/test/${test.id}`} className={`video-item1 ${isTestDisabled ? "disabled" : ""}`}>
                <div className="video-content">
                  <div className="block-row">
                    <div className="block-title">{test.title}</div>
                    <div className="position1">{test.position || "Call-Center"}</div>
                    <span className="progress-text">{test.progress}%</span>
                    <span className="access-text">{test.progress === 100 ? "tak" : "nie"}</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Кнопка возврата к выбору блоков */}
      <div className="back-button-container">
        <Link to={mainPath} className="back-button">Wróć do bloków</Link>
      </div>
    </div>
  );
}

export default Block;

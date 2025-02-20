import React from "react";
import { Link } from "react-router-dom";
import videosData from "../../components/videosData/videosData"; // Данные о видео
import './index.scss';

// Функция для вычисления прогресса блока на основе прогресса видео
const calculateBlockProgress = (videos) => {
  if (videos.length === 0) return 0; // Если нет видео, прогресс 0
  const totalProgress = videos.reduce((acc, video) => acc + video.progress, 0); // Суммируем прогрессы всех видео
  return Math.round(totalProgress / videos.length); // Возвращаем средний прогресс блока
};

function MainPage() {
  // Данные для каждого блока
  const progressData = [
    { title: "Block 1", path: "/block/1", blockId: 1, prevBlockId: null },
    { title: "Block 2", path: "/block/2", blockId: 2, prevBlockId: 1 },
    { title: "Block 3", path: "/block/3", blockId: 3, prevBlockId: 2 },
    { title: "Block 4", path: "/block/4", blockId: 4, prevBlockId: 3 },
  ];

  const checkIfEnabled = (blockId) => {
    if (blockId === 1) return true; // Блок 1 всегда доступен
    const prevBlockData = videosData[progressData[blockId - 1].prevBlockId] || [];
    const prevBlockProgress = calculateBlockProgress(prevBlockData); // Получаем прогресс предыдущего блока
    return prevBlockProgress === 100; // Блок доступен, если предыдущий блок завершен на 100%
  };

  return (
    <div className="main-page">
      <div className="block-container">
        {progressData.map((block, index) => {
          const blockVideosData = videosData[block.blockId] || [];
          const isEnabled = checkIfEnabled(block.blockId);
          const blockProgress = calculateBlockProgress(blockVideosData); // Рассчитываем прогресс блока

          return (
            <Link to={isEnabled ? block.path : "#"} key={index} className={`block-item ${isEnabled ? "" : "disabled"}`}>
              <div className="block-content">
                <div className="block-header">
                  {/* Заголовки на одной строке */}
                  <div className="block-header-row">
                    <div className="block-label">nazwa</div>
                    <div className="progress-label">progresja</div>
                    <div className="percentage-label">procent</div>
                    <div className="dostep-label">dostep</div>
                  </div>
                  {/* Данные блока */}
                  <div className="block-row">
                    <div className="block-title">{block.title}</div>
                    <div className="block-progress-bar-container">
                      <div className="block-progress-bar">
                        <div className="progress" style={{ width: `${blockProgress}%` }}></div> {/* Заполнение прогрессбара */}
                      </div>
                    </div>
                    <span className="progress-text">{blockProgress}%</span>
                    <span className="dostep-text">{isEnabled ? "tak" : "Nie"}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;

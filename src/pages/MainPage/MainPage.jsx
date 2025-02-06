import React from "react";
import { Link } from "react-router-dom";
import "./index.scss"; // Импортируем стили для MainPage

const BlockLink = ({ title, path, progress }) => (
  <div className="block-link">
    <Link to={path} className="block-button">
      <div className="video-content">
        <h3>{title}</h3>
        {progress !== undefined && (
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </Link>
  </div>
);

function MainPage() {
  // Прогресс для блоков
  const block1Progress = 100; // Пример прогресса для Block 1
  const block2Progress = 100; // Пример прогресса для Block 2
  const block3Progress = 40; // Пример прогресса для Block 2
  const block4Progress = 0; // Пример прогресса для Block 2
  

  return (
    <div className="main-page">
      <div className="block-containerMain">
        <BlockLink title="Block 1" path="/block/1" progress={block1Progress} />
        <BlockLink title="Block 2" path="/block/2" progress={block2Progress} />
        <BlockLink title="Block 3" path="/block/3" progress={block3Progress} />
        <BlockLink title="Block 4" path="/block/4" progress={block4Progress} />
      </div>
    </div>
  );
}

export default MainPage;

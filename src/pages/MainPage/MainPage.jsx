import React from "react";
import { Link } from "react-router-dom";
import "./index.scss"; // Импортируем стили для MainPage

const BlockLink = ({ title, path, progress, isEnabled }) => (
  <div className="block-link">
    <Link to={isEnabled ? path : "#"} className={`block-button ${!isEnabled ? 'disabled' : ''}`}>
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
  const block3Progress = 50; // Пример прогресса для Block 3
  const block4Progress = 0; // Пример прогресса для Block 4

  // Условия, при которых блок доступен (т.е. его прогресс должен быть 100%)
  const isBlock1Enabled = true; // Первый блок всегда доступен
  const isBlock2Enabled = block1Progress === 100; // Второй блок доступен только если первый блок на 100%
  const isBlock3Enabled = block2Progress === 100; // Третий блок доступен только если второй блок на 100%
  const isBlock4Enabled = block3Progress === 100; // Четвертый блок доступен только если третий блок на 100%

  return (
    <div className="main-page">
      <div className="block-containerMain">
        <BlockLink
          title="Block 1"
          path="/block/1"
          progress={block1Progress}
          isEnabled={isBlock1Enabled}
        />
        <BlockLink
          title="Block 2"
          path="/block/2"
          progress={block2Progress}
          isEnabled={isBlock2Enabled}
        />
        <BlockLink
          title="Block 3"
          path="/block/3"
          progress={block3Progress}
          isEnabled={isBlock3Enabled}
        />
        <BlockLink
          title="Block 4"
          path="/block/4"
          progress={block4Progress}
          isEnabled={isBlock4Enabled}
        />
      </div>
    </div>
  );
}

export default MainPage;

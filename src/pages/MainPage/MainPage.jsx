import React from "react";
import BlockLink from "./../../components/BlockLinkMain/BlockLinkMain";
import BlockInfo from "../../components/BlockInfo"; // Импортируем новый компонент
import "./index.scss"; // Импортируем стили

function MainPage() {
  const progressData = [
    { title: "Block 1", path: "/block/1", videosData: [
      { id: 11, progress: 100 }, { id: 12, progress: 100 }, { id: 13, progress: 100 },
      { id: 14, progress: 100 }, { id: 15, progress: 100 }, { id: 16, progress: 100 },
      { id: 17, progress: 0 }, { id: 18, progress: 0 }, { id: 19, progress: 0 }, { id: 51, progress: 0 }
    ], isEnabled: true },
    { title: "Block 2", path: "/block/2", videosData: [
      { id: 21, progress: 100 }, { id: 22, progress: 100 }, { id: 23, progress: 100 },
      { id: 24, progress: 100 }, { id: 25, progress: 50 }, { id: 26, progress: 0 },
      { id: 27, progress: 0 }, { id: 28, progress: 0 }, { id: 29, progress: 0 }, { id: 52, progress: 0 }
    ], isEnabled: false },
    { title: "Block 3", path: "/block/3", videosData: [
      { id: 31, progress: 100 }, { id: 32, progress: 100 }, { id: 33, progress: 100 },
      { id: 34, progress: 100 }, { id: 35, progress: 50 }, { id: 36, progress: 0 },
      { id: 37, progress: 0 }, { id: 38, progress: 0 }, { id: 39, progress: 0 }, { id: 53, progress: 0 }
    ], isEnabled: false },
    { title: "Block 4", path: "/block/4", videosData: [
      { id: 41, progress: 100 }, { id: 42, progress: 100 }, { id: 43, progress: 100 },
      { id: 44, progress: 100 }, { id: 45, progress: 50 }, { id: 46, progress: 0 },
      { id: 47, progress: 0 }, { id: 48, progress: 0 }, { id: 49, progress: 0 }, { id: 54, progress: 0 }
    ], isEnabled: false },
  ];

  // Обновляем блоки, чтобы каждый блок проверял предыдущий
  const updatedProgressData = progressData.map((block, index) => {
    if (index === 0) {
      // Блок 1 всегда открыт
      return { ...block, isEnabled: true };
    } else {
      // Для каждого следующего блока проверяем прогресс предыдущего
      return { ...block, isEnabled: progressData[index - 1].videosData.every(video => video.progress === 100) };
    }
  });

  return (
    <div className="main-page">
      <div className="block-containerMain">
        {updatedProgressData.map((block, index) => (
          <div key={index} className="block-item">
            <BlockLink {...block} />
            <BlockInfo videosData={block.videosData} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;

import React from "react";
import BlockLink from "../../components/BlockLinkMain/BlockLinkMain";
import videosData from "../../components/videosData/videosData"; // Данные о видео
import './index.scss';

// Функция для вычисления прогресса блока
const calculateBlockProgress = (videosData) => {
  // Вычисляем общий прогресс блока (средний прогресс всех видео)
  const totalProgress = videosData.reduce((acc, video) => acc + video.progress, 0);
  return totalProgress / videosData.length;
};

function MainPage() {
  // Данные для каждого блока
  const progressData = [
    { title: "Block 1", path: "/block/1", blockId: 1, prevBlockId: null }, // 1-й блок всегда открыт
    { title: "Block 2", path: "/block/2", blockId: 2, prevBlockId: 1 },   // 2-й блок зависит от 1-го
    { title: "Block 3", path: "/block/3", blockId: 3, prevBlockId: 2 },   // 3-й блок зависит от 2-го
    { title: "Block 4", path: "/block/4", blockId: 4, prevBlockId: 3 },   // 4-й блок зависит от 3-го
  ];

  const checkIfEnabled = (blockId) => {
    // Для первого блока всегда возвращаем true
    if (blockId === 1) return true;

    // Для остальных блоков проверяем прогресс предыдущего блока
    const prevBlockData = videosData[progressData[blockId - 1].prevBlockId];
    const prevBlockProgress = prevBlockData ? calculateBlockProgress(prevBlockData) : 0;
    return prevBlockProgress === 100;
  };

  return (
    <div className="main-page">
      <div className="block-containerMain">
        {progressData.map((block, index) => {
          // Получаем данные для текущего блока из videosData по blockId
          const blockVideosData = videosData[block.blockId] || [];
          const isEnabled = checkIfEnabled(block.blockId); // Проверяем, доступен ли блок
          return (
            <div key={index} className="block-item">
              <BlockLink {...block} isEnabled={isEnabled} videosData={blockVideosData} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;

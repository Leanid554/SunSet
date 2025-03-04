import React, { useEffect, useState } from "react";
import BlockItem from "../../components/Main/BlockItem";
import axios from "axios";
import "./index.scss";

const API_URL =
  "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/blocks";

const MainPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [progress, setProgress] = useState({});
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [visitedBlocks, setVisitedBlocks] = useState(new Set());

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("Ошибка: userId не найден в localStorage!");
      return;
    }

    fetchBlocks(userId);
  }, []);

  const fetchBlocks = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      if (!Array.isArray(response.data)) {
        console.error("Ошибка: API вернуло не массив блоков!", response.data);
        return;
      }

      const blocksData = response.data;
      const progressData = {};
      const visitedSet = new Set();

      blocksData.forEach((block) => {
        const lectures = block.lectures || [];
        progressData[block.id] = calculateProgress(lectures);

        if (progressData[block.id] > 0) {
          visitedSet.add(block.id);
        }
      });

      setBlocks(blocksData);
      setProgress(progressData);
      setVisitedBlocks(visitedSet);
    } catch (err) {
      console.error("Ошибка загрузки блоков:", err.message);
    }
  };

  const calculateProgress = (lectures) => {
    const passedLectures = lectures.filter(
      (lecture) => lecture.isCompleted
    ).length;
    return lectures.length > 0
      ? Math.floor((passedLectures / lectures.length) * 100)
      : 0;
  };

  const handleBlockClick = async (blockId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("Ошибка: userId не найден в localStorage!");
      return;
    }

    if (visitedBlocks.has(blockId)) {
      console.warn(`Блок ${blockId} уже посещен, пропускаю.`);
      return;
    }

    setSelectedBlock(blockId);
    setVisitedBlocks((prev) => new Set(prev).add(blockId));

    try {
      await axios.post(`${API_URL}/${blockId}/user/${userId}`, {});
    } catch (err) {
      console.error("Ошибка записи посещения блока:", err.message);
    }
  };

  return (
    <div className="main-page">
      <div className="block-container">
        <div className="block-header-row">
          <div className="block-label">Название</div>
          <div className="progress-label">Прогресс</div>
          <div className="percentage-label">%</div>
          <div className="dostep-label">Доступ</div>
        </div>

        {blocks.length === 0 ? (
          <p>Нет доступных блоков</p>
        ) : (
          blocks.map((block, index) => {
            const previousBlockId = blocks[index - 1]?.id;
            const previousBlockCompleted = previousBlockId
              ? (progress[previousBlockId] || 0) === 100
              : true; // Только первый блок доступен по умолчанию

            return (
              <BlockItem
                key={block.id}
                block={block}
                blockProgress={progress[block.id] || 0}
                lectures={block.lectures || []}
                isEnabled={index === 0 || previousBlockCompleted}
                isActive={selectedBlock === block.id}
                onClick={() => handleBlockClick(block.id)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default MainPage;

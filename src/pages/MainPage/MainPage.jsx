import React, { useEffect, useState } from "react";
import BlockItem from "../../components/Main/BlockItem";
import axios from "axios";
import "./index.scss";

const API_URL =
  "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/blocks";
const LECTURES_URL =
  "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/lectures";

const MainPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [progress, setProgress] = useState({});
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [lecturesStatus, setLecturesStatus] = useState({});
  const [visitedBlocks, setVisitedBlocks] = useState(new Set());

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.error("Błąd: brak identyfikatora użytkownika w localStorage!");
      return;
    }
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    try {
      const { data: blocksData } = await axios.get(API_URL);
      const progressData = {};
      const lectureStatusData = {};
      const visitedSet = new Set();

      for (const block of blocksData) {
        const lectures = await fetchBlockLectures(block.id);
        progressData[block.id] = calculateProgress(lectures);
        lectureStatusData[block.id] = lectures;

        // Если у блока есть хоть один прогресс, считаем его посещенным
        if (progressData[block.id] > 0) {
          visitedSet.add(block.id);
        }
      }

      setBlocks(blocksData);
      setProgress(progressData);
      setLecturesStatus(lectureStatusData);
      setVisitedBlocks(visitedSet);
    } catch (err) {
      console.error("Błąd ładowania bloku:", err.message);
    }
  };

  const fetchBlockLectures = async (blockId) => {
    try {
      const response = await axios.get(
        `${LECTURES_URL}/user/${userId}/block/${blockId}`
      );
      let lectures = response.data;

      if (!Array.isArray(lectures)) {
        console.warn(`Nieprawidłowy format odpowiedzi dla bloku ${blockId}.`);
        return [];
      }

      return lectures;
    } catch (error) {
      console.error("Błąd pobierania wykładów:", {
        status: error.response?.status,
        message: error.message,
        details: error.response?.data,
      });
      return [];
    }
  };

  const calculateProgress = (lectures) => {
    const passedLectures = lectures.filter((lecture) => lecture.passed).length;
    return lectures.length > 0 ? (passedLectures / lectures.length) * 100 : 0;
  };

  const handleBlockClick = async (blockId) => {
    // Если блок уже посещен, не отправляем запрос
    if (visitedBlocks.has(blockId)) {
      console.warn(`Blok ${blockId} już był odwiedzony, pomijam zapis.`);
      return;
    }

    setSelectedBlock(blockId);
    setVisitedBlocks((prev) => new Set(prev).add(blockId)); // Помечаем блок как посещенный

    try {
      await axios.post(`${API_URL}/${blockId}/user/${userId}`, {});
    } catch (err) {
      console.error("Błąd rekordu wizyty w bloku:", err.message);
    }
  };

  return (
    <div className="main-page">
      <div className="block-container">
        <div className="block-header-row">
          <div className="block-label">Tytuł</div>
          <div className="progress-label">Progress</div>
          <div className="percentage-label">%</div>
          <div className="dostep-label">Dostęp</div>
        </div>

        {blocks.map((block, index) => {
          const previousBlockId = blocks[index - 1]?.id;
          const previousBlockPassed = previousBlockId
            ? (progress[previousBlockId] || 0) >= 80
            : true;

          return (
            <BlockItem
              key={block.id}
              block={block}
              blockProgress={progress[block.id] || 0}
              lectures={lecturesStatus[block.id] || []}
              isEnabled={index === 0 || previousBlockPassed}
              isActive={selectedBlock === block.id}
              onClick={() => handleBlockClick(block.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MainPage;

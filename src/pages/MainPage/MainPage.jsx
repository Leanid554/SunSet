import React, { useEffect, useState } from "react";
import BlockItem from "../../components/Main/BlockItem";
import axios from "axios";
import "./index.scss";

const API_URL = process.env.REACT_APP_API_URL;

const MainPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [progress, setProgress] = useState({});
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [visitedBlocks, setVisitedBlocks] = useState(new Set());

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error(
        "Błąd: Identyfikator użytkownika nie znaleziony w localStorage!"
      );
      return;
    }

    fetchBlocks(userId);
  }, []);

  const fetchBlocks = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/blocks/user/${userId}`);
      if (!Array.isArray(response.data)) {
        console.error("Błąd: API nie zwróciło tablicy bloków!", response.data);
        return;
      }

      const blocksData = response.data;
      const progressData = {};
      const visitedSet = new Set();

      blocksData.forEach((block) => {
        progressData[block.id] = calculateProgress(block);
        if (progressData[block.id] > 0) {
          visitedSet.add(block.id);
        }
      });

      setBlocks(blocksData);
      setProgress(progressData);
      setVisitedBlocks(visitedSet);
    } catch (err) {
      console.error("Błąd podczas ładowania bloków:", err.message);
    }
  };

  const calculateProgress = (block) => {
    const lectures = block.lectures || [];
    const totalLectures = lectures.length;
    const completedLectures = lectures.filter(
      (lecture) => lecture.isCompleted
    ).length;

    const isTestPassed = block.test?.userProgress?.passed || false;

    // Jeśli wszystkie wykłady i test są ukończone — 100%
    if (
      totalLectures > 0 &&
      completedLectures === totalLectures &&
      isTestPassed
    ) {
      return 100;
    }

    // Postęp wykładów w %
    const lectureProgress =
      totalLectures > 0 ? (completedLectures / totalLectures) * 100 : 0;
    const testProgress = isTestPassed ? 100 : 0;

    // Waga wykładów 70%, waga testu 30%
    return Math.floor(lectureProgress * 0.7 + testProgress * 0.3);
  };

  const handleBlockClick = async (blockId) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error(
        "Błąd: Identyfikator użytkownika nie znaleziony w localStorage!"
      );
      return;
    }

    if (visitedBlocks.has(blockId)) {
      console.warn(`Blok ${blockId} już odwiedzony, pomijam.`);
      return;
    }

    setSelectedBlock(blockId);
    setVisitedBlocks((prev) => new Set(prev).add(blockId));

    try {
      await axios.post(`${API_URL}/${blockId}/user/${userId}`, {});
    } catch (err) {
      console.error("Błąd zapisu odwiedzenia bloku:", err.message);
    }
  };

  return (
    <div className="main-page">
      <div className="block-container">
        <div className="block-header-row">
          <div className="block-label">Nazwa</div>
          <div className="progress-label">Postęp</div>
          <div className="percentage-label">%</div>
          <div className="dostep-label">Dostęp</div>
        </div>

        {blocks.length === 0 ? (
          <p>Brak dostępnych bloków</p>
        ) : (
          blocks.map((block, index) => {
            const previousBlockId = blocks[index - 1]?.id;
            const previousBlockCompleted = previousBlockId
              ? (progress[previousBlockId] || 0) === 100
              : true; // Pierwszy blok jest zawsze dostępny

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

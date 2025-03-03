import React, { useEffect, useState } from "react";
import BlockItem from "../../components/Main/BlockItem";
import axios from "axios";
import "./index.scss";

const API_URL = "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/blocks";
const LECTURES_URL = "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/lectures";

const MainPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [progress, setProgress] = useState({});
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [lecturesStatus, setLecturesStatus] = useState({});

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId) {
      console.error("Błąd: brak identyfikatora użytkownika w localStorage!");
      return;
    }
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    try {
      const { data: blocksData } = await axios.get(API_URL, getHeaders());
      const progressData = {};
      const lectureStatusData = {};

      for (const block of blocksData) {
        const lectures = await fetchBlockLectures(block.id);
        progressData[block.id] = calculateProgress(lectures);
        lectureStatusData[block.id] = lectures;
      }

      setBlocks(blocksData);
      setProgress(progressData);
      setLecturesStatus(lectureStatusData);
    } catch (err) {
      console.error("Błąd ładowania bloku:", err.message);
    }
  };

  const fetchBlockLectures = async (blockId) => {
    try {
      console.log(`Żądanie API: ${LECTURES_URL}/user/${userId}/block/${blockId}`);

      const response = await axios.get(`${LECTURES_URL}/user/${userId}/block/${blockId}`, getHeaders());
      let lectures = response.data;

      if (!Array.isArray(lectures) || lectures.length === 0) {
        console.warn(`Nie ma odczytów dla bloku ${blockId} lub interfejs API zwrócił nieprawidłowy format.`);
        return [];
      }

      // 2️⃣ Проверяем статус каждой лекции
      for (let i = 0; i < lectures.length; i++) {
        try {
          const progressResponse = await axios.post(
            `${LECTURES_URL}/${lectures[i].id}/complete/${userId}`,
            {}, // Пустое тело запроса
            getHeaders()
          );

          lectures[i].passed = progressResponse.data.passed || false;
          console.log(` ID wykładu: ${lectures[i].id} | Przyjęto: ${lectures[i].passed}`);

          // Если текущая лекция пройдена, разблокируем следующую
          if (lectures[i].passed && lectures[i + 1]) {
            lectures[i + 1].locked = false;
          } else if (i > 0) {
            lectures[i].locked = !lectures[i - 1].passed;
          }
        } catch (progressError) {
          console.error(`Błąd sprawdzania statusu lekcji ${lectures[i].id}:`, progressError.response?.data || progressError.message);
          lectures[i].passed = false;
        }
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
    const passedLectures = lectures.filter(lecture => lecture.passed).length;
    return lectures.length > 0 ? (passedLectures / lectures.length) * 100 : 0;
  };

  const handleBlockClick = async (blockId) => {
    setSelectedBlock(blockId);
    try {
      await axios.post(`${API_URL}/${blockId}/user/${userId}`, {}, getHeaders());
    } catch (err) {
      console.error(" Błąd rekordu wizyty w bloku:", err.message);
    }
  };

  const getHeaders = () => {
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
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

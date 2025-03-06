import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Block from "../../components/Block/Block";

const API_BASE_URL = process.env.BASE_URL;

function BlockPages() {
  const { id, blockId } = useParams();
  const userId = localStorage.getItem("userId");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`🆔 Aktualny identyfikator użytkownika: ${userId}`);
    console.log(
      `📚 Żądanie wykładów dla identyfikatora użytkownika: ${userId}, Block ID: ${blockId}`
    );

    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/lectures/user/${userId}/block/${blockId}`
        );

        console.log("✅ Otrzymane wykłady:", response.data);

        let updatedVideos = response.data.map((lecture, index) => ({
          ...lecture,
          locked: index !== 0,
        }));

        for (let i = 0; i < updatedVideos.length; i++) {
          if (i === 0) {
            updatedVideos[i].locked = false;
          } else {
            const prevLecture = updatedVideos[i - 1];
            const currentLecture = updatedVideos[i];

            // Если предыдущая лекция пройдена и текущая доступна, разблокируем
            if (prevLecture.isAccessible && currentLecture.isAccessible) {
              updatedVideos[i].locked = false;
            }
          }
        }

        setVideos(updatedVideos);
      } catch (err) {
        setError("❌ Błąd pobierania wykładów");
        console.error("Błąd:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [id, blockId, userId]);

  if (loading) return <p>⏳ Ładowanie...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <Block videos={videos} mainPath="/main" />;
}

export default BlockPages;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Block from "../../components/Block/Block";

const API_BASE_URL = "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me";

function BlockPages() {
  const { id, blockId } = useParams(); // Получаем blockId из URL
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Логируем запрос
  console.log(`Requesting data for user ID: ${id}, Block ID: ${blockId}`);
  console.log(`Request URL: ${API_BASE_URL}/lectures/user/${id}/block/${blockId}`);
  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/lectures/user/${id}/block/${blockId}`);
        console.log("Response data:", response.data); 
        setVideos(response.data);
      } catch (err) {
        setError("Ошибка загрузки лекций");
        console.error("Ошибка:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [id, blockId]);  // Добавляем зависимость от blockId

  const getAccessibleVideos = (videos) => {
    let accessibleVideos = [];
    for (let i = 0; i < videos.length; i++) {
      if (i === 0 || videos[i - 1].progress === 100) {
        accessibleVideos.push(videos[i]);
      } else {
        break;
      }
    }
    return accessibleVideos;
  };

  const accessibleVideos = getAccessibleVideos(videos);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <Block videos={accessibleVideos} mainPath="/main" />;
}

export default BlockPages;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Block from "../../components/Block/Block";

const API_BASE_URL = "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me";

function BlockPages() {
  const { id, blockId } = useParams();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/lectures/user/${id}/block/${blockId}`);
        setLectures(response.data);
      } catch (err) {
        setError("Ошибка загрузки лекций");
        console.error("Ошибка:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, [id, blockId]);

  const handleLectureClick = async (lecture) => {
    if (!lecture.isAccessible) return;

    try {
      await axios.get(`${API_BASE_URL}/lectures/${lecture.id}/user/${id}`);
    } catch (err) {
      console.error("Ошибка записи посещения лекции:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <Block videos={lectures} mainPath="/main" onLectureClick={handleLectureClick} />;
}

export default BlockPages;

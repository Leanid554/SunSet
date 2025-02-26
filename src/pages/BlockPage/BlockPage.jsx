import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Block from "../../components/Block/Block";

const API_BASE_URL = "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me";

function BlockPages() {
  const { id, blockId } = useParams(); 
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(`Requesting lectures for user ID: ${id}, Block ID: ${blockId}`);
  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/lectures/user/${id}/block/${blockId}`);
        console.log("Fetched lectures:", response.data);
        setVideos(response.data);
      } catch (err) {
        setError("Ошибка загрузки лекций");
        console.error("Ошибка:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [id, blockId]); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return <Block videos={videos} mainPath="/main" />;
}

export default BlockPages;

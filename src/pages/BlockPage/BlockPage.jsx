import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Block from "../../components/Block/Block";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const API_BASE_URL = process.env.REACT_APP_API_URL;

function BlockPages() {
  const { blockId } = useParams();
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testAvailable, setTestAvailable] = useState(false);

  useEffect(() => {
    if (!blockId) {
      setError("❌ Nieprawidłowy identyfikator bloku");
      setLoading(false);
      return;
    }

    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/lectures/user/${userId}/block/${blockId}`
        );

        let updatedVideos = response.data.map((lecture, index) => {
          const isPreviousLectureCompleted =
            index === 0 || response.data[index - 1]?.isCompleted;

          const locked = !isPreviousLectureCompleted || !lecture.isAccessible;

          return {
            ...lecture,
            locked,
          };
        });

        setVideos(updatedVideos);
      } catch (err) {
        setError("❌ Błąd pobierania wykładów");
      } finally {
        setLoading(false);
      }
    };

    const fetchTestForBlock = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/block-test/${blockId}`
        );
        if (response.data?.questions?.length > 0) {
          setTestAvailable(true);
        }
      } catch (err) {}
    };

    fetchVideos();
    fetchTestForBlock();
  }, [blockId, userId]);

  const areAllLecturesAccessible = videos.every((video) => video.isCompleted);
  const isTestEnabled = areAllLecturesAccessible && testAvailable;

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <Block blockId={blockId} videos={videos} mainPath="/main" />
    </div>
  );
}

export default BlockPages;
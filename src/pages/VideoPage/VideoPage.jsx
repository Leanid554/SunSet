import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import VideoPlayer from "../../components/Video/VideoPlayer";
import QuestionVideo from "../../components/Video/QuestionVideo";
import NavigationButtons from "../../components/Video/NavigationButtons";
import "./index.scss";

function VideoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoProgress, setVideoProgress] = useState(0);
  const [isLectureCompleted, setIsLectureCompleted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      if (videoRef.current) {
        setVideoProgress(videoRef.current.currentTime);
      }
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", updateTime);
      console.log("Лекция выбрана:", video);
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", updateTime);
      }
    };
  }, []);

  const handleLectureComplete = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        alert("Ошибка: пользователь не авторизован!");
        return;
      }

      // Отправляем запрос на сервер для завершения лекции и изменения passed на true
      await axios.post(
        `https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/lectures/${id}/complete/${userId}`,
        {
          passed: true  // Обновляем значение passed на true
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsLectureCompleted(true);
      alert("Lekcję ukończono и записа!"); // Уведомление об успешном завершении
    } catch (error) {
      console.error("Ошибка при сохранении завершения лекции:", error);
      alert("Ошибка при сохранении завершения лекции!"); // Уведомление об ошибке
    }
  };

  return (
    <div className="video-page">
      <VideoPlayer ref={videoRef} />
      <QuestionVideo lectureId={id} videoRef={videoRef} onLectureComplete={handleLectureComplete} />
      
      {isLectureCompleted && (
        <button className="complete-lecture-btn" onClick={handleLectureComplete}>
          Zakończ Lekcję
        </button>
      )}

      <NavigationButtons videoId={id} onNext={() => navigate(`/video/${+id + 1}`)} />
    </div>
  );
}

export default VideoPage;

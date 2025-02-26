import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VideoPlayer from "../../components/Video/VideoPlayer";
import QuizPopup from "../../components/Video/QuizPopup";
import NavigationButtons from "../../components/Video/NavigationButtons";
import "./index.scss";

function VideoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef(null);

  // Обновляем текущее время видео
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.ontimeupdate = () => {
        setVideoProgress(videoElement.currentTime);
      };
    }
  }, []);

  const handleAnswer = (answer) => {
    console.log("Ответ пользователя:", answer);
  };

  const handleNext = () => {
    navigate(`/video/${+id + 1}`);
  };

  return (
    <div className="video-page">
      <h3>Лекция {id}</h3>
      
      {/* Передаём ref в VideoPlayer, но сам код VideoPlayer НЕ ТРОГАЕМ */}
      <VideoPlayer ref={videoRef} />

      {/* Передаём время видео в QuizPopup */}
      <QuizPopup lectureId={id} currentTime={videoProgress} onAnswer={handleAnswer} />

      <NavigationButtons videoId={id} onNext={handleNext} />
    </div>
  );
}

export default VideoPage;

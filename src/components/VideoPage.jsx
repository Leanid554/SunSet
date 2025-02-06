// src/pages/MainPage/VideoPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import "./VideoPage.scss";

function VideoPage() {
  const { id } = useParams();  // Получаем id видео из URL

  // Формируем путь к видео
  const videoUrl = `/videos/video${id}.mp4`;

  return (
    <div className="video-page">
      <h2>Video {id}</h2>
      <video className="video-player" src={videoUrl} controls />
    </div>
  );
}

export default VideoPage;

import React from "react";
import { useParams, Link } from "react-router-dom";

function VideoPage() {
  const { id } = useParams(); 

  return (
    <div>
      <h2>Видео {id}</h2>
      <video width="600" controls>
      <source src={`/videos/video${id}.mp4`} type="video/mp4" /> 
        Ваш браузер не поддерживает видео.
      </video>
      <br />
      <Link to="/main">Назад</Link>
    </div>
  );
}

export default VideoPage;

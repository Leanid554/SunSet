import React from "react";
import { useParams } from "react-router-dom";
import Block from "../../components/Block/Block";
import videosData from "../../components/videosData/videosData"; // Импортируем данные


function getAccessibleVideos(videos) {
  let accessibleVideos = [];
  for (let i = 0; i < videos.length; i++) {
    if (i === 0 || videos[i - 1].progress === 100) {
      accessibleVideos.push(videos[i]);
    } else {
      break;
    }
  }
  return accessibleVideos;
}

function BlockPages() {
  const { id } = useParams();
  const videos = videosData[id] || [];
  const accessibleVideos = getAccessibleVideos(videos);

  return <Block videos={accessibleVideos} mainPath="/main" />;
}

export default BlockPages;

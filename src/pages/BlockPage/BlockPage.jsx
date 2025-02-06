import React from "react";
import { useParams } from "react-router-dom";
import Block1 from "../../components/Block/Block"; 

const videosData = {
  1: [
    { id: 1, title: "Intro Video", progress: 30 },
    { id: 2, title: "Lesson 1", progress: 60 },
  ],
  2: [
    { id: 3, title: "Lesson 2", progress: 80 },
    { id: 4, title: "Final Test", progress: 100 },
  ],
};

function Block1Page() {
  const { id } = useParams(); 
  const videos = videosData[id] || []; 

  return <Block1 videos={videos} mainPath="/main" />;
}

export default Block1Page;

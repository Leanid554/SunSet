// src/pages/BlockPages/BlockPages.jsx
import React from "react";
import { useParams } from "react-router-dom";
import Block from "../../components/Block/Block"; // Импортируем Block
import './index.scss';

const videosData = {
  1: [
    { id: 11, title: "Lekcja1", progress: 100 },
    { id: 12, title: "Lekcja2", progress: 100 },
    { id: 13, title: "Lekcja3", progress: 100 },
    { id: 14, title: "Lekcja4", progress: 100 },
    { id: 15, title: "Lekcja5", progress: 50 },
    { id: 16, title: "Lekcja6", progress: 0 },
    { id: 17, title: "Lekcja7", progress: 0 },
    { id: 18, title: "Lekcja8", progress: 0 },
    { id: 19, title: "Lekcja9", progress: 0 },
    { id: 51, title: "Test 1", progress: 0 },
  ],
  2: [
    { id: 21, title: "Lekcja1", progress: 100 },
    { id: 22, title: "Lekcja2", progress: 100 },
    { id: 23, title: "Lekcja3", progress: 100 },   //1n 1block
    { id: 24, title: "Lekcja4", progress: 100 },
    { id: 25, title: "Lekcja5", progress: 50 },  //2n 2block
    { id: 26, title: "Lekcja6", progress: 0 },
    { id: 27, title: "Lekcja7", progress: 0 },
    { id: 28, title: "Lekcja8", progress: 0 },
    { id: 29, title: "Lekcja9", progress: 0 },
    { id: 52, title: "Test 2", progress: 0 }, //5n айди тестов для блоков
  ],
  3: [
    { id: 31, title: "Lekcja1", progress: 100 },
    { id: 32, title: "Lekcja2", progress: 100 },
    { id: 33, title: "Lekcja3", progress: 100 },   //1n 1block
    { id: 34, title: "Lekcja4", progress: 100 },
    { id: 35, title: "Lekcja5", progress: 50 },  //2n 2block
    { id: 36, title: "Lekcja6", progress: 0 },
    { id: 37, title: "Lekcja7", progress: 0 },
    { id: 38, title: "Lekcja8", progress: 0 },
    { id: 39, title: "Lekcja9", progress: 0 },
    { id: 53, title: "Test 3", progress: 0 }, //5n айди тестов для блоков
  ],
  4: [
    { id: 41, title: "Lekcja1", progress: 100 },
    { id: 42, title: "Lekcja2", progress: 100 },
    { id: 43, title: "Lekcja3", progress: 100 },   //1n 1block
    { id: 44, title: "Lekcja4", progress: 100 },
    { id: 45, title: "Lekcja5", progress: 50 },  //2n 2block
    { id: 46, title: "Lekcja6", progress: 0 },
    { id: 47, title: "Lekcja7", progress: 0 },
    { id: 48, title: "Lekcja8", progress: 0 },
    { id: 49, title: "Lekcja9", progress: 0 },
    { id: 54, title: "Test 4", progress: 0 }, //5n айди тестов для блоков
  ],
  
};

function BlockPages() {
  const { id } = useParams();
  const videos = videosData[id] || [];

  return <Block videos={videos} mainPath="/main" />;
}

export default BlockPages;

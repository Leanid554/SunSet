// src/pages/MainPage/MainPage.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Block1 from "../../components/Block1"; // Импортируем Block1
import Block2 from "../../components/Block2"; // Импортируем Block2
import "./index.scss"; // Основные стили для MainPage

const BlockLink = ({ title, path }) => (
  <div className="block-link">
    <Link to={path} className="block-button">
      {title}
    </Link>
  </div>
);

function MainPage() {
  return (
    <div className="main-page">
      <h1>Главная страница</h1>
      <div className="block-container">
        <BlockLink title="Block 1" path="/block1" />
        <BlockLink title="Block 2" path="/block2" />
      </div>

      <Routes>
        <Route path="/block1" element={<Block1 />} />
        <Route path="/block2" element={<Block2 />} />
        <Route path="/main" element={<MainPage />} /> {/* Главная страница */}
      </Routes>
    </div>
  );
}

export default MainPage;

import React, { useEffect, useState } from "react";
import BlockItem from "../../components/Main/BlockItem";
import "./index.scss";

const API_URL = "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/blocks";

const MainPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setBlocks(data))
      .catch((err) => console.error("Ошибка загрузки блоков:", err));
  }, []);

  useEffect(() => {
    fetch("https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/user-progress")
      .then((res) => res.json())
      .then((data) => setProgress(data))
      .catch((err) => console.error("Ошибка загрузки прогресса:", err));
  }, []);

  const checkIfEnabled = (block, index) => {
    if (index === 0) return true; 
    const prevBlock = blocks[index - 1];
    return prevBlock && progress[prevBlock.id] === 100; 
  };

  return (
    <div className="main-page">
      <div className="block-container">
        <div className="block-header-row">
          <div className="block-label">nazwa</div>
          <div className="progress-label">progresja</div>
          <div className="percentage-label">procent</div>
          <div className="dostep-label">dostep</div>
        </div>

        {blocks.map((block) => (
          <BlockItem 
            key={block.id} 
            block={block} 
            blockProgress={block.progress || 0} 
            isEnabled={block.isEnabled || true} 
          />
        ))}

      </div>
    </div>
  );
};

export default MainPage;

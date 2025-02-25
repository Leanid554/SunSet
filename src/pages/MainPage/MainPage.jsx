import React, { useEffect, useState } from "react";
import BlockItem from "../../components/Main/BlockItem";
import "./index.scss";

const API_URL = "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/blocks";

const MainPage = ({ userId }) => {
  const [blocks, setBlocks] = useState([]);
  const [progress, setProgress] = useState({});
  const [selectedBlock, setSelectedBlock] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setBlocks(data))
      .catch((err) => console.error("Ошибка загрузки блоков:", err));
  }, []);

  useEffect(() => {
    fetch(`https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/user-progress`)
      .then((res) => res.json())
      .then((data) => setProgress(data))
      .catch((err) => console.error("Ошибка загрузки прогресса:", err));
  }, []);

  const handleBlockClick = (blockId) => {
    setSelectedBlock(blockId);

    fetch(`https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/blocks/${blockId}/user/${userId}`)
      .then((res) => res.json())
      .catch((err) => console.error("Ошибка записи посещения блока:", err));
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
            blockProgress={progress[block.id] || 0}
            isEnabled={block.isEnabled || true}
            isActive={selectedBlock === block.id}
            onClick={() => handleBlockClick(block.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MainPage;

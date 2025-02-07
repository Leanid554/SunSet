import React from "react";
import BlockLink from "./../../components/BlockLinkMain/BlockLinkMain";
import "./index.scss"; // Импортируем стили

function MainPage() {
  const progressData = [
    { title: "Block 1", path: "/block/1", progress: 100, isEnabled: true },
    { title: "Block 2", path: "/block/2", progress: 100, isEnabled: true },
    { title: "Block 3", path: "/block/3", progress: 50, isEnabled: false },
    { title: "Block 4", path: "/block/4", progress: 0, isEnabled: false },
    { title: "Block 5", path: "/block/1", progress: 100, isEnabled: true },
    { title: "Block 6", path: "/block/2", progress: 100, isEnabled: true },
    { title: "Block 7", path: "/block/3", progress: 50, isEnabled: false },
    { title: "Block 8", path: "/block/4", progress: 0, isEnabled: false },
  ];

  return (
    <div className="main-page">
      <div className="block-containerMain">
        {progressData.map((block, index) => (
          <BlockLink key={index} {...block} />
        ))}
      </div>
    </div>
  );
}

export default MainPage;

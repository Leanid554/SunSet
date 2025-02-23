import React, { useState } from "react";

const AddLecture = ({ blocks, lectures, setLectures }) => {
  const [newLecture, setNewLecture] = useState({ blockId: "", title: "" });

  const addLecture = () => {
    if (newLecture.blockId !== "" && newLecture.title.trim() !== "") {
      setLectures([...lectures, { ...newLecture, id: lectures.length + 1 }]);
      setNewLecture({ blockId: "", title: "" });
    }
  };

  return (
    <div className="admin-section">
      <h3>📖 Dodaj lekcję</h3>
      <select
        value={newLecture.blockId}
        onChange={(e) => setNewLecture({ ...newLecture, blockId: e.target.value })}
      >
        <option value="">Wybierz blok</option>
        {blocks.map((block) => (
          <option key={block.id} value={block.id}>
            {block.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Tytuł lekcji"
        value={newLecture.title}
        onChange={(e) => setNewLecture({ ...newLecture, title: e.target.value })}
      />
      <button onClick={addLecture}>➕ Dodaj</button>
    </div>
  );
};

export default AddLecture;

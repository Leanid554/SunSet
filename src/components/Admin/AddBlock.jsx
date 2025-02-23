import React, { useState } from "react";

const AddBlock = ({ blocks, setBlocks }) => {
  const [newBlockName, setNewBlockName] = useState("");

  const addBlock = () => {
    if (newBlockName.trim() !== "") {
      setBlocks([...blocks, { id: blocks.length + 1, name: newBlockName }]);
      setNewBlockName("");
    }
  };

  return (
    <div className="admin-section">
      <h3>📂 Dodaj nowy blok</h3>
      <input
        type="text"
        placeholder="Nazwa bloku"
        value={newBlockName}
        onChange={(e) => setNewBlockName(e.target.value)}
      />
      <button onClick={addBlock}>➕ Dodaj</button>
    </div>
  );
};

export default AddBlock;

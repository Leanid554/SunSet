import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me";

const AddBlock = ({ blocks, setBlocks }) => {
  const [newBlockName, setNewBlockName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addBlock = async () => {
    if (newBlockName.trim() === "") return;
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.post(`${API_BASE_URL}/blocks`, { title: newBlockName });
  
      const newBlock = {
        ...response.data,
        path: response.data.path || `/blocks/${response.data.id}` // Если path нет, создаём свой
      };
  
      setBlocks([...blocks, newBlock]); // Добавляем блок с path
      setNewBlockName("");
    } catch (err) {
      setError("Błąd podczas dodawania bloku");
      console.error("Błąd:", err);
    } finally {
      setLoading(false);
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
      <button onClick={addBlock} disabled={loading}>
        {loading ? "Dodatek..." : "➕ Dodać"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddBlock;

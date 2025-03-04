import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me";

const AddLecture = ({ lectures, setLectures }) => {
  const [blocks, setBlocks] = useState([]); 
  const [newLecture, setNewLecture] = useState({ blockId: "", title: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/blocks`);
      setBlocks(response.data);
    } catch (err) {
      console.error("Błąd podczas ładowania bloków:", err);
      setError("Nie udało się załadować bloków");
    }
  };

  const addLecture = async () => {
    if (!newLecture.blockId || newLecture.title.trim() === "") return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/lectures`, {
        title: newLecture.title,
        blockId: parseInt(newLecture.blockId),
      });

      setLectures([...lectures, response.data]); // Добавляем новую лекцию в состояние
      setNewLecture({ blockId: "", title: "" });
    } catch (err) {
      setError("Błąd podczas dodawania lekcji");
      console.error("Błąd:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-section">
      <h3>📖 Dodaj wykład</h3>
      
      {error && <p style={{ color: "red" }}>{error}</p>}

      <select
        value={newLecture.blockId}
        onChange={(e) => setNewLecture({ ...newLecture, blockId: e.target.value })}
      >
        <option value="">Wybierz blok</option>
        {blocks.length > 0 ? (
          blocks.map((block) => (
            <option key={block.id} value={block.id}>
              {block.title}
            </option>
          ))
        ) : (
          <option disabled>Ładowanie bloków...</option>
        )}
      </select>

      <input
        type="text"
        placeholder="Tytuł wykładu"
        value={newLecture.title}
        onChange={(e) => setNewLecture({ ...newLecture, title: e.target.value })}
      />

      <button onClick={addLecture} disabled={loading}>
      {loading ? "Dodatek..." : "➕ Dodać"}
      </button>
    </div>
  );
};

export default AddLecture;

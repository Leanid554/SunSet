import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const AddBlock = ({ blocks, setBlocks }) => {
  const [newBlockName, setNewBlockName] = useState("");
  const [role, setRole] = useState(""); // Wybieramy rolę z API
  const [roles, setRoles] = useState([]); // Lista ról z backendu
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roleLoading, setRoleLoading] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      setRoleLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/roles/all`);
        setRoles(response.data);
        setRole(response.data.length > 0 ? response.data[0].name : ""); // Ustawiamy pierwszą rolę domyślnie
      } catch (err) {
        setError("Błąd podczas pobierania listy ról");
        console.error("Błąd ładowania ról:", err);
      } finally {
        setRoleLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const addBlock = async () => {
    if (newBlockName.trim() === "" || !role) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/blocks`, {
        title: newBlockName,
        role,
      });

      const newBlock = {
        ...response.data,
        path: response.data.path || `/blocks/${response.data.id}`,
      };

      setBlocks([...blocks, newBlock]);
      setNewBlockName("");
      setRole(roles.length > 0 ? roles[0].name : ""); // Resetujemy rolę
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
      {roleLoading ? (
        <p>Ładowanie ról...</p>
      ) : (
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          {roles.map((r) => (
            <option key={r.id} value={r.name}>
              {r.name}
            </option>
          ))}
        </select>
      )}
      <button onClick={addBlock} disabled={loading || roleLoading}>
        {loading ? "Dodawanie..." : "➕ Dodać"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddBlock;

import React, { useState, useEffect } from "react";
import axios from "axios";
import AddUser from "./AddUser";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const AddBlock = ({ blocks, setBlocks }) => {
  const [newBlockName, setNewBlockName] = useState("");
  const [role, setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roleLoading, setRoleLoading] = useState(false);

  const fetchRoles = async () => {
    setRoleLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/roles/all`);
      setRoles(response.data);
      if (response.data.length > 0) {
        setRole(response.data[0].name);
      }
    } catch (err) {
      setError("Błąd podczas pobierania listy ról");
    } finally {
      setRoleLoading(false);
    }
  };

  useEffect(() => {
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
      setRole(roles.length > 0 ? roles[0].name : "");

      fetchRoles();
    } catch (err) {
      setError("Błąd podczas dodawania bloku");
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

      <AddUser setRoles={setRoles} roles={roles} />
    </div>
  );
};

export default AddBlock;

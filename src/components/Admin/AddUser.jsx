import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const AddUser = ({ users, setUsers }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "użytkownik", // По умолчанию "пользователь"
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    setError("");
  };

  const addUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      setError("Wszystkie pola są wymagane!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/create`,
        newUser
      );
      if (response.status === 201) {
        const updatedUsers = [...users, response.data];
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setNewUser({ name: "", email: "", password: "", role: "użytkownik" });
      } else {
        setError("Błąd serwera.");
      }
    } catch (error) {
      setError("Błąd podczas dodawania użytkownika.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-section">
      <h3>👤 Dodaj użytkownika</h3>
      <input
        type="text"
        name="name"
        placeholder="Imie"
        value={newUser.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={newUser.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Hasło"
        value={newUser.password}
        onChange={handleChange}
      />

      <label>Wybierz rolę:</label>
      <select name="role" value={newUser.role} onChange={handleChange}>
        <option value="użytkownik">użytkownik (Użytkownik)</option>
        <option value="administrator">administrator (Administrator)</option>
      </select>

      <button onClick={addUser} disabled={loading}>
        {loading ? "Dodatek..." : "➕ Dodać"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddUser;

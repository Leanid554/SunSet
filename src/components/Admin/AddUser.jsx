import React, { useState } from "react";
import axios from "axios";

const AddUser = ({ users, setUsers }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "użytkownik",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
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
        "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/users/create",
        {
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          role: newUser.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setUsers([...users, response.data]); 
        setNewUser({ name: "", email: "", password: "", role: "użytkownik" });
      } else {
        setError("Serwer zwrócił nieoczekiwany kod odpowiedzi.");
      }
    } catch (error) {
      console.error("Błąd podczas dodawania użytkownika:", error);

      if (error.response) {
        setError(error.response.data.message || "Błąd serwera. Spróbuj ponownie.");
      } else {
        setError("Błąd sieci. Sprawdź swoje połączenie.");
      }
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
        placeholder="Imię"
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
      <select name="role" value={newUser.role} onChange={handleChange}>
        <option value="użytkownik">Użytkownik</option>
        <option value="administrator">Administrator</option>
      </select>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={addUser} disabled={loading}>
        {loading ? "Dodawanie..." : "➕ Dodaj"}
      </button>
    </div>
  );
};

export default AddUser;

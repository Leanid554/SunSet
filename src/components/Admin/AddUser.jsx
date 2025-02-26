import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me";

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
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    setError("");
  };

  const addUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      setError("Все поля обязательны!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/users/create`, newUser);
      if (response.status === 201) {
        const updatedUsers = [...users, response.data];
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setNewUser({ name: "", email: "", password: "", role: "użytkownik" });
      } else {
        setError("Ошибка сервера.");
      }
    } catch (error) {
      setError("Ошибка при добавлении пользователя.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-section">
      <h3>👤 Добавить пользователя</h3>
      <input type="text" name="name" placeholder="Имя" value={newUser.name} onChange={handleChange} />
      <input type="email" name="email" placeholder="E-mail" value={newUser.email} onChange={handleChange} />
      <input type="password" name="password" placeholder="Пароль" value={newUser.password} onChange={handleChange} />
      <button onClick={addUser} disabled={loading}>{loading ? "Добавление..." : "➕ Добавить"}</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddUser;

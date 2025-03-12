import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const AddUser = ({ users, setUsers }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "", // Initially empty, will be filled after fetching roles
  });

  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState(""); // For new role input
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch roles from the API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/roles/all`);
        setRoles(response.data); // Assuming response is an array of roles
      } catch (error) {
        setError("Błąd podczas pobierania ról.");
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRoleChange = (e) => {
    setNewRole(e.target.value);
  };

  const addUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password || !newUser.role) {
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
        setNewUser({ name: "", email: "", password: "", role: "" });
      } else {
        setError("Błąd serwera.");
      }
    } catch (error) {
      setError("Błąd podczas dodawania użytkownika.");
    } finally {
      setLoading(false);
    }
  };

  const addRole = async () => {
    if (!newRole) {
      setError("Nazwa roli jest wymagana!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/roles/create`, {
        name: newRole,
      });
      if (response.status === 201) {
        setRoles([...roles, response.data]);
        setNewRole("");
        setError(""); // Reset any error message
      } else {
        setError("Błąd serwera podczas dodawania roli.");
      }
    } catch (error) {
      setError("Błąd podczas dodawania roli.");
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

      <label>Wybierz rolę:</label>
      <select name="role" value={newUser.role} onChange={handleChange}>
        <option value="">Wybierz rolę</option>
        {roles.map((role) => (
          <option key={role.id} value={role.name}>
            {role.name}
          </option>
        ))}
      </select>

      <button onClick={addUser} disabled={loading}>
        {loading ? "Dodatek..." : "➕ Dodać"}
      </button>

      <h3>Dodaj nową rolę</h3>
      <input
        type="text"
        value={newRole}
        onChange={handleRoleChange}
        placeholder="Nazwa nowej roli"
      />
      <button onClick={addRole} disabled={loading}>
        {loading ? "Dodatek..." : "➕ Dodaj rolę"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddUser;

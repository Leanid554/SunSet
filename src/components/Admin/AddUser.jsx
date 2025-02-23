import React, { useState } from "react";

const AddUser = ({ users, setUsers }) => {
  const [newUser, setNewUser] = useState({ email: "", password: "", role: "użytkownik" });

  const addUser = () => {
    if (newUser.email.trim() !== "" && newUser.password.trim() !== "") {
      setUsers([...users, { id: users.length + 1, ...newUser }]);
      setNewUser({ email: "", password: "", role: "użytkownik" });
    }
  };

  return (
    <div className="admin-section">
      <h3>👤 Dodaj użytkownika</h3>
      <input
        type="email"
        placeholder="E-mail"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Hasło"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
        <option value="użytkownik">Użytkownik</option>
        <option value="administrator">Administrator</option>
      </select>
      <button onClick={addUser}>➕ Dodaj</button>
    </div>
  );
};

export default AddUser;

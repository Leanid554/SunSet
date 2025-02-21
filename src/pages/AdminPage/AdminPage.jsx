import React, { useState } from "react";
import "./index.scss";

const AdminPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [newBlockName, setNewBlockName] = useState("");
  const [lectures, setLectures] = useState([]);
  const [newLecture, setNewLecture] = useState({ blockId: "", title: "" });

  const [users, setUsers] = useState([
    { id: 1, email: "anna@example.com", role: "użytkownik", password: "********" },
    { id: 2, email: "admin@example.com", role: "administrator", password: "********" },
  ]);

  const [newUser, setNewUser] = useState({ email: "", password: "", role: "użytkownik" });

  // Dodawanie nowego bloku
  const addBlock = () => {
    if (newBlockName.trim() !== "") {
      setBlocks([...blocks, { id: blocks.length + 1, name: newBlockName }]);
      setNewBlockName("");
    }
  };

  // Dodawanie nowej lekcji
  const addLecture = () => {
    if (newLecture.blockId !== "" && newLecture.title.trim() !== "") {
      setLectures([...lectures, { ...newLecture, id: lectures.length + 1 }]);
      setNewLecture({ blockId: "", title: "" });
    }
  };

  // Dodawanie nowego użytkownika
  const addUser = () => {
    if (newUser.email.trim() !== "" && newUser.password.trim() !== "") {
      setUsers([...users, { id: users.length + 1, ...newUser }]);
      setNewUser({ email: "", password: "", role: "użytkownik" });
    }
  };

  return (
    <div className="admin-page">
      <h2>📌 Panel Administratora</h2>

      {/* Dodawanie nowego bloku */}
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

      {/* Dodawanie lekcji */}
      <div className="admin-section">
        <h3>📖 Dodaj lekcję</h3>
        <select value={newLecture.blockId} onChange={(e) => setNewLecture({ ...newLecture, blockId: e.target.value })}>
          <option value="">Wybierz blok</option>
          {blocks.map((block) => (
            <option key={block.id} value={block.id}>
              {block.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Tytuł lekcji"
          value={newLecture.title}
          onChange={(e) => setNewLecture({ ...newLecture, title: e.target.value })}
        />
        <button onClick={addLecture}>➕ Dodaj</button>
      </div>

      {/* Dodawanie użytkownika */}
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

      {/* Lista użytkowników */}
      <div className="admin-section">
        <h3>👥 Lista użytkowników</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>E-mail</th>
              <th>Rola</th>
              <th>Hasło</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>********</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;

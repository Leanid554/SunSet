import React, { useState } from "react";
import AddBlock from "../../components/Admin/AddBlock";
import AddLecture from "../../components/Admin/AddLecture";
import AddUser from "../../components/Admin/AddUser";
import UserList from "../../components/Admin/UserList";
import "./index.scss";

const AdminPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [users, setUsers] = useState([
    { id: 1, email: "anna@example.com", role: "użytkownik", password: "********" },
    { id: 2, email: "admin@example.com", role: "administrator", password: "********" },
  ]);

  return (
    <div className="admin-page">
      <h2>📌 Panel Administratora</h2>

      <AddBlock blocks={blocks} setBlocks={setBlocks} />
      <AddLecture blocks={blocks} lectures={lectures} setLectures={setLectures} />
      <AddUser users={users} setUsers={setUsers} />
      <UserList users={users} />
    </div>
  );
};

export default AdminPage;

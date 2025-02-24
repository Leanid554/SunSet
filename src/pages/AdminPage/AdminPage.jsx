import React, { useState, useEffect } from "react";
import axios from "axios";
import AddBlock from "../../components/Admin/AddBlock";
import AddLecture from "../../components/Admin/AddLecture";
import AddUser from "../../components/Admin/AddUser";
import UserList from "../../components/Admin/UserList";
import "./index.scss";

const AdminPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://testapp-backend-eynpzx-3ec2cf-217-154-81-219.traefik.me/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Błąd podczas pobierania użytkowników:", error);
    }
  };

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

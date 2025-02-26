import React from "react";

const UserList = ({ users }) => {
  return (
    <div className="admin-section">
      <h3>👥 Список пользователей</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>E-mail</th>
            <th>Роль</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

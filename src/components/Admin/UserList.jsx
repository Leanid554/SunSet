import React from "react";

const UserList = ({ users }) => {
  return (
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
  );
};

export default UserList;

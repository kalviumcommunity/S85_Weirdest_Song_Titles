import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserFilter.css";

const UserFilter = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    onUserSelect(userId);
  };

  return (
    <div className="user-filter">
      <label htmlFor="user-select">Filter by User:</label>
      <select
        id="user-select"
        value={selectedUser}
        onChange={handleUserChange}
        className="user-select"
      >
        <option value="">All Users</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserFilter;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSongs } from "../utils/api";
import SongCard from "../components/SongCard";
import AddSong from "../components/AddSong";
import axios from "axios";
import "./HomePage.css";

const HomePage = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    console.log("HomePage mounted. Current user state:", user);
    loadSongs();
    fetchUsers();
  }, []);

  const loadSongs = async () => {
    setLoading(true);
    const data = await fetchSongs();
    setSongs(data);
    setFilteredSongs(data);
    setLoading(false);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUserFilter = (userId) => {
    setSelectedUser(userId);
    if (userId) {
      const filtered = songs.filter((song) => song.created_by === userId);
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(songs);
    }
  };

  const handleLogout = () => {
    console.log("Logging out user");
    localStorage.removeItem("user");
    setUser(null);
    console.log("User state cleared");
  };

  // Log whenever user state changes
  useEffect(() => {
    console.log("User state changed in HomePage:", user);
  }, [user]);

  return (
    <div className="homepage-container">
      <div className="header">
        <h1 className="title">🎵 Weirdest Song Collection 🎵</h1>
        <div className="auth-buttons">
          {user ? (
            <>
              <span className="welcome-text">Welcome, {user.username}!</span>
              <button className="auth-btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className="auth-btn" onClick={() => navigate("/login")}>
                Login
              </button>
              <button className="auth-btn" onClick={() => navigate("/signup")}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {/* User Filter Dropdown */}
      <div className="filter-section">
        <select
          value={selectedUser}
          onChange={(e) => handleUserFilter(e.target.value)}
          className="user-filter-dropdown"
        >
          <option value="">All Users</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.username}
            </option>
          ))}
        </select>
      </div>

      {user && <AddSong onSongAdded={loadSongs} />}

      {loading ? (
        <p className="message">Loading songs...</p>
      ) : filteredSongs.length === 0 ? (
        <p className="message">No songs found. Add some weird songs!</p>
      ) : (
        <div className="song-list">
          {filteredSongs.map((song) => (
            <SongCard
              key={song._id}
              song={song}
              onSongUpdate={loadSongs}
              canEdit={user ? true : false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

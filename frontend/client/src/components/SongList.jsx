import { useState } from "react";
import { FaEdit, FaTrash, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import axios from "axios";
import UserFilter from "./UserFilter";
import "./SongList.css"; // Make sure your CSS is correctly linked

const SongList = ({ songs, refreshSongs }) => {
  const navigate = useNavigate(); // ✅ Initialize navigation
  const [filteredSongs, setFilteredSongs] = useState(songs);

  const handleUserSelect = (userId) => {
    if (!userId) {
      setFilteredSongs(songs);
    } else {
      const filtered = songs.filter((song) => song.created_by === userId);
      setFilteredSongs(filtered);
    }
  };

  const handleEdit = (id) => {
    navigate(`/update/${id}`); // ✅ Navigate to update page with song ID
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      try {
        await axios.delete(`http://localhost:5000/api/songs/${id}`);
        refreshSongs(); // Refresh song list after deletion
      } catch (error) {
        console.error("Error deleting song:", error);
      }
    }
  };

  return (
    <div className="song-list-container">
      <UserFilter onUserSelect={handleUserSelect} />
      <div className="song-list">
        {filteredSongs.map((song) => (
          <div key={song._id} className="song-card">
            <div className="song-image-container">
              <img
                src={song.cover_image}
                alt={song.title}
                className="song-image"
              />
              <div className="overlay">
                <a
                  href={song.song_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaPlay className="play-icon" />
                </a>
              </div>
            </div>

            <div className="song-details">
              <h3>{song.title}</h3>
              <p>
                {song.artist} - {song.album}
              </p>
              <p>
                <strong>{song.genre}</strong>
              </p>
              <p className="fun-fact">{song.fun_fact}</p>

              <div className="song-actions">
                <FaEdit
                  className="edit-icon"
                  onClick={() => handleEdit(song._id)}
                />{" "}
                {/* ✅ Edit Icon Fix */}
                <FaTrash
                  className="delete-icon"
                  onClick={() => handleDelete(song._id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongList;

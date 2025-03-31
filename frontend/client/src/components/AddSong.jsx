import { useState } from "react";
import axios from "axios";
import "./AddSong.css";

const AddSong = ({ onSongAdded }) => {
  const [songData, setSongData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    fun_fact: "",
    song_link: "",
    cover_image: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setSongData({ ...songData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting song data:", songData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/songs",
        songData
      );
      console.log("Song added:", response.data);
      setSongData({
        title: "",
        artist: "",
        album: "",
        genre: "",
        fun_fact: "",
        song_link: "",
        cover_image: "",
      });
      setShowForm(false); // Hide form after submission
      onSongAdded(); // Refresh the song list
    } catch (error) {
      console.error(
        "Error adding song:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="add-song-container">
      <button
        className="toggle-form-btn"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Close Form" : "Add New Song"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="add-song-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={songData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="artist"
            placeholder="Artist"
            value={songData.artist}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="album"
            placeholder="Album"
            value={songData.album}
            onChange={handleChange}
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={songData.genre}
            onChange={handleChange}
          />
          <textarea
            name="fun_fact"
            placeholder="Fun Fact"
            value={songData.fun_fact}
            onChange={handleChange}
          />
          <input
            type="text"
            name="song_link"
            placeholder="Song Link"
            value={songData.song_link}
            onChange={handleChange}
          />
          <input
            type="text"
            name="cover_image"
            placeholder="Cover Image URL"
            value={songData.cover_image}
            onChange={handleChange}
          />
          <button type="submit">Add Song</button>
        </form>
      )}
    </div>
  );
};

export default AddSong;

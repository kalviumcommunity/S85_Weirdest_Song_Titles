import { useState } from "react";
import { addSong } from "../utils/api";
import "./AddSong.css";

const AddSong = ({ onSongAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [songData, setSongData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    fun_fact: "",
    song_link: "",
    cover_image: "",
  });

  const handleChange = (e) => {
    setSongData({ ...songData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSong(songData);
    setSongData({
      title: "",
      artist: "",
      album: "",
      genre: "",
      fun_fact: "",
      song_link: "",
      cover_image: "",
    });
    setShowForm(false);
    onSongAdded();
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
          {[
            "title",
            "artist",
            "album",
            "genre",
            "fun_fact",
            "song_link",
            "cover_image",
          ].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              placeholder={field.replace("_", " ")}
              value={songData[field]}
              onChange={handleChange}
              required
            />
          ))}
          <button type="submit">Add Song</button>
        </form>
      )}
    </div>
  );
};

export default AddSong;

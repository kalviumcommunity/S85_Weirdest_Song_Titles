import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSongById, updateSong } from "../utils/api";
import "./UpdateSong.css";

const UpdateSong = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [songData, setSongData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    fun_fact: "",
    song_link: "",
    cover_image: "",
  });

  useEffect(() => {
    const loadSongDetails = async () => {
      setLoading(true);
      const data = await fetchSongById(id);
      if (data) setSongData(data);
      setLoading(false);
    };
    loadSongDetails();
  }, [id]);

  const handleChange = (e) => {
    setSongData({ ...songData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    await updateSong(id, songData);
    setUpdating(false);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (loading) {
    return <div className="update-song-container">Loading song details...</div>;
  }

  return (
    <div className="update-song-container">
      <h1>Update Song Details 🎵</h1>
      <form onSubmit={handleSubmit} className="update-song-form">
        {[
          { field: "title", label: "Song Title" },
          { field: "artist", label: "Artist" },
          { field: "album", label: "Album" },
          { field: "genre", label: "Genre" },
          { field: "fun_fact", label: "Fun Fact" },
          { field: "song_link", label: "Song Link" },
          { field: "cover_image", label: "Cover Image URL" },
        ].map(({ field, label }) => (
          <div key={field} className="form-group">
            <label htmlFor={field}>{label}</label>
            <input
              id={field}
              type="text"
              name={field}
              placeholder={label}
              value={songData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="form-buttons">
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" disabled={updating}>
            {updating ? "Updating..." : "Update Song"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSong;

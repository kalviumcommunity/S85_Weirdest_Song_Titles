import { useState, useEffect } from "react";
import { addSong } from "../utils/api";
import axios from "axios";
import "./AddSong.css";

const AddSong = ({ onSongAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [songData, setSongData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    fun_fact: "",
    song_link: "",
    cover_image: "",
    created_by: "",
  });
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    setSongData({ ...songData, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    try {
      await addSong(songData);
      setSongData({
        title: "",
        artist: "",
        album: "",
        genre: "",
        fun_fact: "",
        song_link: "",
        cover_image: "",
        created_by: "",
      });
      setShowForm(false);
      onSongAdded();
    } catch (error) {
      console.error("Error adding song:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrors([error.response.data.message]);
      } else {
        setErrors(["An unexpected error occurred. Please try again."]);
      }
    } finally {
      setIsSubmitting(false);
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
          {errors.length > 0 && (
            <div className="error-messages">
              {errors.map((error, index) => (
                <p key={index} className="error-message">
                  {error}
                </p>
              ))}
            </div>
          )}

          {[
            { field: "title", label: "Song Title", required: true },
            { field: "artist", label: "Artist", required: true },
            { field: "album", label: "Album", required: false },
            { field: "genre", label: "Genre", required: true },
            { field: "fun_fact", label: "Fun Facts", required: false },
            { field: "song_link", label: "Song Link", required: true },
            { field: "cover_image", label: "Cover Image Link", required: true },
          ].map(({ field, label, required }) => (
            <div key={field} className="form-field">
              <label htmlFor={field}>
                {label}
                {required && <span className="required-asterisk">*</span>}
              </label>
              {field === "genre" ? (
                <select
                  id={field}
                  name={field}
                  value={songData[field]}
                  onChange={handleChange}
                  required={required}
                  className={
                    errors.some((err) => err.toLowerCase().includes(field))
                      ? "error"
                      : ""
                  }
                >
                  <option value="">Select Genre</option>
                  <option value="Pop">Pop</option>
                  <option value="Rock">Rock</option>
                  <option value="Jazz">Jazz</option>
                  <option value="Hip-Hop">Hip-Hop</option>
                  <option value="Classical">Classical</option>
                  <option value="Experimental">Experimental</option>
                  <option value="EDM">EDM</option>
                  <option value="Metal">Metal</option>
                  <option value="Country">Country</option>
                  <option value="Novelty">Novelty</option>
                </select>
              ) : (
                <input
                  id={field}
                  type="text"
                  name={field}
                  placeholder={label}
                  value={songData[field]}
                  onChange={handleChange}
                  required={required}
                  className={
                    errors.some((err) => err.toLowerCase().includes(field))
                      ? "error"
                      : ""
                  }
                />
              )}
            </div>
          ))}

          <div className="form-field">
            <label htmlFor="created_by">
              Created By
              <span className="required-asterisk">*</span>
            </label>
            <select
              id="created_by"
              name="created_by"
              value={songData.created_by}
              onChange={handleChange}
              required
              className={
                errors.some((err) => err.toLowerCase().includes("created_by"))
                  ? "error"
                  : ""
              }
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Song"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AddSong;

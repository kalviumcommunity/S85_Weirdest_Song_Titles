import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSongById, updateSong } from "../utils/api";
import "./UpdateSong.css";

const UpdateSong = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const [songData, setSongData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    fun_fact: "",
    song_link: "",
    cover_image: "",
  });
  const [changedFields, setChangedFields] = useState({});

  useEffect(() => {
    const loadSongDetails = async () => {
      setLoading(true);
      const data = await fetchSongById(id);
      if (data) {
        setSongData(data);
        setOriginalData(data);
      }
      setLoading(false);
    };
    loadSongDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSongData((prev) => ({ ...prev, [name]: value }));

    // Only mark field as changed if it's different from original
    if (originalData && value !== originalData[name]) {
      setChangedFields((prev) => ({ ...prev, [name]: true }));
    } else {
      setChangedFields((prev) => {
        const newChanges = { ...prev };
        delete newChanges[name];
        return newChanges;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    // Only send changed fields in the update request
    const updatedFields = {};
    Object.keys(changedFields).forEach((field) => {
      updatedFields[field] = songData[field];
    });

    // Only proceed with update if there are changes
    if (Object.keys(updatedFields).length > 0) {
      await updateSong(id, updatedFields);
    }

    setUpdating(false);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (loading) {
    return <div className="update-song-container">Loading song details...</div>;
  }

  const hasChanges = Object.keys(changedFields).length > 0;

  return (
    <div className="update-song-container">
      <h1>Update Song Details</h1>
      <form onSubmit={handleSubmit} className="update-song-form">
        {[
          { field: "title", label: "Song Title", required: true },
          { field: "artist", label: "Artist", required: true },
          { field: "album", label: "Album", required: false },
          { field: "genre", label: "Genre", required: true },
          { field: "fun_fact", label: "Fun Facts", required: false },
          { field: "song_link", label: "Song Link", required: true },
          { field: "cover_image", label: "Cover Image Link", required: true },
        ].map(({ field, label, required }) => (
          <div
            key={field}
            className={`form-group ${
              changedFields[field] ? "field-changed" : ""
            }`}
          >
            <label htmlFor={field}>
              {label}
              {required && <span className="required-asterisk">*</span>}
              {changedFields[field] && (
                <span className="change-indicator">● Modified</span>
              )}
            </label>
            {field === "genre" ? (
              <select
                id={field}
                name={field}
                value={songData[field]}
                onChange={handleChange}
                required={required}
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
              />
            )}
          </div>
        ))}
        <div className="form-buttons">
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" disabled={updating || !hasChanges}>
            {updating
              ? "Updating..."
              : hasChanges
              ? "Update Changed Fields"
              : "No Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSong;

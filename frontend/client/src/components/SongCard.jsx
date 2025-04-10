import { motion as Motion } from "framer-motion";
import { PlayCircle, Pencil, Trash2 } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { deleteSong } from "../utils/api";
import "./SongCard.css";

const SongCard = ({ song, onSongUpdate }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/update/${song._id}`);
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${song.title}"?`)) {
      await deleteSong(song._id);
      onSongUpdate(); // Refresh the songs list
    }
  };

  return (
    <Motion.div
      className="song-card"
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
    >
      <div className="image-container">
        <img src={song.cover_image} alt={song.title} />
        <Motion.a
          href={song.song_link}
          target="_blank"
          rel="noopener noreferrer"
          className="play-icon"
          whileHover={{ scale: 1.2 }}
        >
          <PlayCircle size={48} />
        </Motion.a>
      </div>

      <div className="content">
        <h2>{song.title}</h2>
        <p>
          {song.artist} - {song.album}
        </p>
        <p className="genre">{song.genre}</p>
        <p className="fun-fact">{song.fun_fact}</p>
      </div>

      <div className="song-card-actions">
        <Motion.button
          className="edit-button"
          onClick={handleEdit}
          whileHover={{ scale: 1.1 }}
        >
          <Pencil size={22} />
        </Motion.button>
        <Motion.button
          className="delete-button"
          onClick={handleDelete}
          whileHover={{ scale: 1.1 }}
        >
          <Trash2 size={22} />
        </Motion.button>
      </div>
    </Motion.div>
  );
};

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05 },
};

SongCard.propTypes = {
  song: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    album: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    fun_fact: PropTypes.string.isRequired,
    cover_image: PropTypes.string.isRequired,
    song_link: PropTypes.string.isRequired,
  }).isRequired,
  onSongUpdate: PropTypes.func.isRequired,
};

export default SongCard;

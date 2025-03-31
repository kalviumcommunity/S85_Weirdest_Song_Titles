import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import PropTypes from "prop-types";
import "./SongCard.css";

const SongCard = ({ song }) => {
  return (
    <motion.div
      className="song-card"
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
    >
      <div className="image-container">
        <img src={song.cover_image} alt={song.title} />
        <motion.a
          href={song.song_link}
          target="_blank"
          rel="noopener noreferrer"
          className="play-icon"
          whileHover={{ scale: 1.2 }}
        >
          <PlayCircle size={48} />
        </motion.a>
      </div>

      <div className="content">
        <h2>{song.title}</h2>
        <p>
          {song.artist} - {song.album}
        </p>
        <p className="genre">{song.genre}</p>
        <p className="fun-fact">{song.fun_fact}</p>
      </div>
    </motion.div>
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
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    album: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    fun_fact: PropTypes.string.isRequired,
    cover_image: PropTypes.string.isRequired,
    song_link: PropTypes.string.isRequired,
  }).isRequired,
};

export default SongCard;

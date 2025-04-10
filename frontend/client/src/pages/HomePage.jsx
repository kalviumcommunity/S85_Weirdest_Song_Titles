import { useState, useEffect } from "react";
import { fetchSongs } from "../utils/api";
import SongCard from "../components/SongCard";
import AddSong from "../components/AddSong";
// import "./HomePage.css";

const HomePage = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    setLoading(true);
    const data = await fetchSongs();
    setSongs(data);
    setLoading(false);
  };

  return (
    <div className="homepage-container">
      <h1 className="title">🎵 Weirdest Song Collection 🎵</h1>
      <AddSong onSongAdded={loadSongs} />

      {loading ? (
        <p>Loading songs...</p>
      ) : songs.length === 0 ? (
        <p>No songs found. Add some weird songs!</p>
      ) : (
        <div className="song-list">
          {songs.map((song) => (
            <SongCard key={song._id} song={song} onSongUpdate={loadSongs} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

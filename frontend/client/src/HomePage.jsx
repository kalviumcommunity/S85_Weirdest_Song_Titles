import { useState, useEffect } from "react";
import SongCard from "./components/SongCard";
import axios from "axios";

const HomePage = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch songs from backend
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/songs");
        setSongs(response.data.data); // ✅ Correctly accessing songs array
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  if (loading) return <h2>Loading songs...</h2>;

  return (
    <div>
      <h1>Weirdest Song Collection 🎵</h1>
      {songs.length === 0 ? (
        <p>No songs found. Add some weird songs!</p>
      ) : (
        <div className="song-list">
          {songs.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

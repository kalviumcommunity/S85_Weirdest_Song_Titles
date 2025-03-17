//Landing page
import SongCard from "./components/SongCard";

const sampleSong = {
  title: "Weirdest Song Ever",
  artist: "DJ Funky",
  album: "Bizarre Tunes",
  year: 2023,
  genre: "Experimental",
  duration: "03:45",
  language: "Gibberish",
  weirdness_level: 9,
  rating: 8,
  fun_fact: "This song was recorded using kitchen utensils!",
  listener_reactions: [
    "What did I just hear?",
    "Surprisingly catchy!",
    "Is that a spoon solo?",
  ],
  song_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  cover_image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
};

const App = () => (
  <div>
    <h1>Weirdest Song Collection 🎵</h1>
    <SongCard song={sampleSong} />
  </div>
);

export default App;

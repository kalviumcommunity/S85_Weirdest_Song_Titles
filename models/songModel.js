const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  duration: { type: String, required: true },
  language: { type: String, required: true },
  weirdness_level: { type: Number, required: true, min: 1, max: 10 },
  rating: { type: Number, required: true, min: 1, max: 10 },
  fun_fact: { type: String, required: true },
  listener_reactions: { type: [String], required: true },
  song_link: { type: String, required: true },
  cover_image: { type: String, required: true },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;

const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, trim: true },
  artist: { type: String, required: true, trim: true },
  album: { type: String, trim: true },
  year: {
    type: Number,
    min: 1900,
    max: new Date().getFullYear(),
    default: null,
  }, // ⬅️ Made optional
  genre: {
    type: String,
    enum: [
      "Pop",
      "Rock",
      "Jazz",
      "Hip-Hop",
      "Classical",
      "Experimental",
      "EDM",
      "Metal",
      "Country",
      "Novelty",
    ],
    default: "Novelty", // ⬅️ Default value
  },
  duration: {
    type: String,
    match: [/^\d+:\d{2}$/, "Duration must be in 'MM:SS' format"],
    default: null,
  }, // ⬅️ Optional
  language: { type: String, enum: ["English", "Other"], default: "English" }, // ⬅️ Default value
  weirdness_level: { type: Number, min: 1, max: 10, default: null }, // ⬅️ Optional
  rating: { type: Number, min: 1, max: 10, default: null }, // ⬅️ Optional
  fun_fact: { type: String, trim: true, default: "" },
  listener_reactions: { type: [String], default: [] }, // ⬅️ Optional
  song_link: {
    type: String,
    match: [
      /^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
      "Invalid URL format",
    ],
    required: true,
  },
  cover_image: {
    type: String,
    match: [
      /^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
      "Invalid URL format",
    ],
    required: true,
  },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;

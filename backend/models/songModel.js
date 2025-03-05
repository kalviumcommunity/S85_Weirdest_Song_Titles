const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  artist: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  album: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear(),
  },
  genre: {
    type: String,
    required: true,
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
    ],
  },
  duration: {
    type: String,
    required: true,
    match: [/^\d+:\d{2}$/, "Duration must be in 'MM:SS' format"],
  },
  language: {
    type: String,
    required: true,
    trim: true,
    enum: [
      "English",
      "Spanish",
      "French",
      "Hindi",
      "Japanese",
      "Korean",
      "Nepali",
      "Bhojpuri",
      "Maithili",
      "Gibberish",
      "Other",
    ],
  },
  weirdness_level: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  fun_fact: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 300,
  },
  listener_reactions: {
    type: [String],
    required: true,
    validate: {
      validator: (arr) => arr.length > 0,
      message: "At least one listener reaction is required.",
    },
  },
  song_link: {
    type: String,
    required: true,
    match: [
      /^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
      "Invalid URL format",
    ],
  },
  cover_image: {
    type: String,
    required: true,
    match: [
      /^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
      "Invalid URL format",
    ],
  },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;

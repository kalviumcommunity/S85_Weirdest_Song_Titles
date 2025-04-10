const express = require("express");
const Song = require("../models/songModel"); // Import your Mongoose model
const validateSong = require("../middleware/validateSong"); // Import validation middleware
const router = express.Router();

// ✅ CREATE - Add a new song
router.post("/", validateSong, async (req, res) => {
  try {
    console.log("Received song data:", req.body);
    const newSong = new Song(req.body);
    await newSong.save();
    res.status(201).json({ success: true, data: newSong });
  } catch (error) {
    // Handle duplicate key error (unique title constraint)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A song with this title already exists",
        error: "Duplicate title",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error adding song",
      error: error.message,
    });
  }
});

// ✅ READ - Get all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json({ success: true, data: songs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching songs",
      error: error.message,
    });
  }
});

// ✅ READ - Get a single song by ID
router.get("/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song)
      return res
        .status(404)
        .json({ success: false, message: "Song not found" });
    res.status(200).json({ success: true, data: song });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching song",
      error: error.message,
    });
  }
});

// ✅ UPDATE - Modify a song by ID
router.put("/:id", validateSong, async (req, res) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedSong)
      return res
        .status(404)
        .json({ success: false, message: "Song not found" });
    res.status(200).json({ success: true, data: updatedSong });
  } catch (error) {
    // Handle duplicate key error (unique title constraint)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A song with this title already exists",
        error: "Duplicate title",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error updating song",
      error: error.message,
    });
  }
});

// ✅ DELETE - Remove a song by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    if (!deletedSong)
      return res
        .status(404)
        .json({ success: false, message: "Song not found" });
    res
      .status(200)
      .json({ success: true, message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting song",
      error: error.message,
    });
  }
});

module.exports = router;

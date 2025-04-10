const validateSong = (req, res, next) => {
  const { title, artist, song_link, cover_image } = req.body;
  const errors = [];

  // Required fields validation
  if (!title) errors.push("Title is required");
  if (!artist) errors.push("Artist is required");
  if (!song_link) errors.push("Song link is required");
  if (!cover_image) errors.push("Cover image URL is required");

  // URL format validation
  const urlRegex = /^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  if (song_link && !urlRegex.test(song_link)) {
    errors.push("Invalid song link URL format");
  }
  if (cover_image && !urlRegex.test(cover_image)) {
    errors.push("Invalid cover image URL format");
  }

  // Duration format validation (if provided)
  if (req.body.duration) {
    const durationRegex = /^\d+:\d{2}$/;
    if (!durationRegex.test(req.body.duration)) {
      errors.push("Duration must be in 'MM:SS' format");
    }
  }

  // Genre validation (if provided)
  const validGenres = [
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
  ];
  if (req.body.genre && !validGenres.includes(req.body.genre)) {
    errors.push(`Genre must be one of: ${validGenres.join(", ")}`);
  }

  // Language validation (if provided)
  const validLanguages = ["English", "Other"];
  if (req.body.language && !validLanguages.includes(req.body.language)) {
    errors.push(`Language must be one of: ${validLanguages.join(", ")}`);
  }

  // Numeric range validations
  if (req.body.weirdness_level) {
    const level = Number(req.body.weirdness_level);
    if (isNaN(level) || level < 1 || level > 10) {
      errors.push("Weirdness level must be a number between 1 and 10");
    }
  }

  if (req.body.rating) {
    const rating = Number(req.body.rating);
    if (isNaN(rating) || rating < 1 || rating > 10) {
      errors.push("Rating must be a number between 1 and 10");
    }
  }

  if (req.body.year) {
    const year = Number(req.body.year);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1900 || year > currentYear) {
      errors.push(`Year must be between 1900 and ${currentYear}`);
    }
  }

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  // If validation passes, proceed to the next middleware
  next();
};

module.exports = validateSong;

import axios from "axios";

const API_URL = "http://localhost:5000/api/songs";

export const fetchSongs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
};

export const addSong = async (songData) => {
  try {
    await axios.post(API_URL, songData);
  } catch (error) {
    console.error("Error adding song:", error.response?.data || error.message);
  }
};

export const updateSong = async (id, songData) => {
  try {
    await axios.put(`${API_URL}/${id}`, songData);
  } catch (error) {
    console.error("Error updating song:", error);
  }
};

export const deleteSong = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting song:", error);
  }
};

export const fetchSongById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching song:", error);
    return null;
  }
};

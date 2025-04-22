import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import UpdateSong from "./components/UpdateSong";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route
          path="/update/:id"
          element={user ? <UpdateSong /> : <Login setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

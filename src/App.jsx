// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import Home from "./Pages/home/Home";
import NewSong from "./Pages/newSong/NewSong";
import Show from "./Pages/show/Show";
import EditSong from "./Pages/edit/EditSong";

import "./styles/App.scss";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/songs" replace />} />
        <Route path="/songs" element={<Home />} />
        <Route path="/songs/new" element={<NewSong />} />
        <Route path="/songs/:id" element={<Show />} />
        <Route path="/songs/:id/edit" element={<EditSong />} />
      </Routes>
    </div>
  );
}

export default App;

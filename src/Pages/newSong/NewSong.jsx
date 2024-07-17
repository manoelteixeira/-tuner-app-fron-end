// src/Pages/newSong/NewSong.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./newSong.scss";

const API = import.meta.env.VITE_BASE_URL;
export default function NewSong() {
  const navigate = useNavigate();
  const [song, setSong] = useState({
    name: "",
    artist: "",
    album: "",
    time: 0,
    is_favorite: false,
  });

  const handleChange = (event) => {
    setSong((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleCheckboxChange = () => {
    setSong({ ...song, is_favorite: !song.is_favorite });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(song);
    const options = {
      method: "POST",
      body: JSON.stringify({
        ...song,
        time: Number.isInteger(song.time)
          ? song.time
          : Math.ceil(song.time * 60),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${API}/songs/`, options)
      .then((res) => res.json())
      .then((res) => {
        alert(`${res.name} Added.`);
        navigate(`/songs/`);
      })
      .catch((err) => {
        err.json().then((err) => {
          alert(`Error: ${err.error}`);
        });
      });
  };

  return (
    <div className="new-song">
      <div className="h1 new-song__title">New Song</div>
      <form className="new-song__form" onSubmit={handleSubmit}>
        <div className="new-song__form-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={song.name}
            onChange={handleChange}
          />
        </div>
        <div className="new-song__form-field">
          <label htmlFor="artist">Artist:</label>
          <input
            type="text"
            placeholder="Artist"
            name="artist"
            value={song.artist}
            onChange={handleChange}
          />
        </div>
        <div className="new-song__form-field">
          <label htmlFor="album">Album:</label>
          <input
            type="text"
            placeholder="Album"
            name="album"
            value={song.album}
            onChange={handleChange}
          />
        </div>
        <div className="new-song__form-field">
          <label htmlFor="time">Time:</label>
          <input
            type="text"
            placeholder="Time in secons"
            name="time"
            value={song.time}
            onChange={handleChange}
          />
        </div>
        <div className="new-song__form-check">
          <label htmlFor="is_favorite">Favorite:</label>
          <input
            id="is_favorite"
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={song.is_favorite}
          />
        </div>
        <button type="submit" className="new-song__form-submit">
          Add Song
        </button>
      </form>
    </div>
  );
}

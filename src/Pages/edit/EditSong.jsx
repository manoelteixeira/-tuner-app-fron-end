// src/Pages/edit/EditSong.jsx

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./editSong.scss";

const API = import.meta.env.VITE_BASE_URL;

export default function EditSong() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);

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
    const options = {
      method: "PUT",
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
    fetch(`${API}/songs/${id}`, options)
      .then((res) => res.json())
      .then((res) => {
        alert(`${res.name} Updated.`);
        navigate(`/songs/${id}`);
      })
      .catch((err) => {
        err.json().then((errJSON) => alert(errJSON.error));
      });
  };

  useEffect(() => {
    fetch(`${API}/songs/${id}`)
      .then((res) => res.json())
      .then((res) => setSong(res))
      .catch((err) => console.error(err));
  }, [id]);

  if (!song) {
    return (
      <div className="edit-song">
        <h1 className="edit-song__loading">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="edit-song">
        <div className="h1 edit-song__title">Edit Song</div>
        <form className="edit-song__form" onSubmit={handleSubmit}>
          <div className="edit-song__form-field">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={song.name}
              onChange={handleChange}
            />
          </div>
          <div className="edit-song__form-field">
            <label htmlFor="artist">Artist:</label>
            <input
              type="text"
              placeholder="Artist"
              name="artist"
              value={song.artist}
              onChange={handleChange}
            />
          </div>
          <div className="edit-song__form-field">
            <label htmlFor="album">Album:</label>
            <input
              type="text"
              placeholder="Album"
              name="album"
              value={song.album}
              onChange={handleChange}
            />
          </div>
          <div className="edit-song__form-field">
            <label htmlFor="time">Time:</label>
            <input
              type="text"
              placeholder="Time in secons"
              name="time"
              value={song.time}
              onChange={handleChange}
            />
          </div>
          <div className="edit-song__form-check">
            <label htmlFor="is_favorite">Favorite:</label>
            <input
              id="is_favorite"
              type="checkbox"
              onChange={handleCheckboxChange}
              checked={song.is_favorite}
            />
          </div>
          <button type="submit" className="edit-song__form-submit">
            Edit Song
          </button>
        </form>
      </div>
    );
  }
}

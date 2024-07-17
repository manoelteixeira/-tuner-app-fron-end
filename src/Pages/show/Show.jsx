// src/Pages/show/Show.jsx
import { useNavigate, useParams, Link } from "react-router-dom";
import "./show.scss";
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BASE_URL;
export default function Show() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);

  const handleDelete = () => {
    const options = {
      method: "DELETE",
    };
    fetch(`${API}/songs/${id}`, options)
      .then((res) => res.json())
      .then(() => {
        alert(`${song.name} Deleted`);
        navigate("/songs");
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetch(`${API}/songs/${id}`)
      .then((res) => res.json())
      .then((res) => setSong(res))
      .catch((err) => console.error(err));
  });

  if (!song) {
    return (
      <div className="show">
        <h1 className="show__loading">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="show">
        <h1 className="show__title">Song View</h1>
        <div className="show__details">
          <div className="show__details-item">
            Name: <span>{song.name}</span>
          </div>
          <div className="show__details-item">
            Artist: <span>{song.artist}</span>
          </div>
          <div className="show__details-item">
            Time: <span>{(song.time / 60).toPrecision(2)} min</span>
          </div>
          <div className="show__details-item">
            Favorite: <span>{song.is_favorite ? "✅" : "❌"}</span>
          </div>
        </div>
        <div className="show__controls">
          <Link to="/songs">
            <div className="show__controls-back">Back</div>
          </Link>
          <Link to={`/songs/${song.id}/edit`}>
            <div className="show__controls-edit">Edit</div>
          </Link>
          <div className="show__controls-delete" onClick={handleDelete}>
            Delete
          </div>
        </div>
      </div>
    );
  }
}

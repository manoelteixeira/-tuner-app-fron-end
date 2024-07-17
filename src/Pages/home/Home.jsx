// src/Pages/home/Home.jsx
import { useEffect, useState } from "react";
import "./home.scss";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL;

export default function Home() {
  const [songs, setSongs] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${API}/songs/`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setSongs(res);
      })
      .catch((err) => console.error(err));
  }, []);
  if (!songs) {
    return (
      <div className="home">
        <h1 className="home__loading">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="home">
        <h1 className="home__title">All Songs</h1>
        <div className="home__songs">
          {songs.map((song) => {
            return (
              <div
                key={song.id}
                className={"home__song"}
                onClick={() => {
                  navigate(`/songs/${song.id}`);
                }}
              >
                <div
                  className={`home__song-item ${
                    song.is_favorite ? "favorite" : ""
                  }`}
                >
                  <span>{song.name}</span> By {song.artist}
                </div>
                <div className="home__song-time">
                  {(song.time / 60).toPrecision(2)} min
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

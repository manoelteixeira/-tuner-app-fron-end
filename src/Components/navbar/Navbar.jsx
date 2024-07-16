// src/Components/navbar/Navbar.jsx
import { Link } from "react-router-dom";
import "./navbar.scss";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/songs" className="navbar__title">
        Tuner
      </Link>
      <Link to="/songs/new" className="navbar__new">
        Add New Song
      </Link>
    </nav>
  );
}

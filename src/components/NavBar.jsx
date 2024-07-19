import axios from "axios";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/logout");
    if (res.data.success) {
      navigate("/");
    }
  };

  return (
    <div>
      <h3>DnD Encounter Manager</h3>
      <Link to="/encounters">Encounters</Link>
      <button>
        <Link to="/login">Login</Link>
      </button>
      <LogoutButton onLogout={handleLogout} />
      <Link to="/register">Register</Link>
    </div>
  );
}

export default NavBar;

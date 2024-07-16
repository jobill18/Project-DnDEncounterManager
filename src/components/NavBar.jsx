import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <h3>DnD Encounter Manager</h3>
      <Link to="/myencounters">Saved Encounters</Link>
      <Link to="/encounters">Premade Encounters</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default NavBar;

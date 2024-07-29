import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useDispatch, useSelector } from "react-redux";

function NavBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/logout");
    if (res.data.success) {
      dispatch({ type: "SET_USER", payload: null });
      navigate("/");
    }
  };

  return user ? (
    <div>
      <h3>DnD Encounter Manager</h3>
      <Link to="/encounters">Encounters</Link>
      <button onClick={handleLogout}>
        <Link to="/">Log Out</Link>
      </button>
    </div>
  ) : (
    <div>
      <h3>DnD Encounter Manager</h3>
      <Link to="/encounters">Encounters</Link>
      <button>
        <Link to="/login">Login</Link>
      </button>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default NavBar;

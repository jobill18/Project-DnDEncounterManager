import axios from "axios";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Button } from "react-bootstrap";

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
    <Nav variant="tabs" defaultActiveKey="/">
      <Nav.Item>
        <Nav.Link href="/">DnD Encounter Manager</Nav.Link>
      </Nav.Item>
      <Nav.Item xs="6">
        <Nav.Link href="/encounters">Encounters</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Button onClick={handleLogout}>Log Out</Button>
      </Nav.Item>
    </Nav>
  ) : (
    <Nav variant="tabs" defaultActiveKey="/">
      <Nav.Item>
        <Nav.Link href="/">DnD Encounter Manager</Nav.Link>
      </Nav.Item>
      <Nav.Item xs="5">
        <Nav.Link href="/encounters">Encounters</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/register">Register</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavBar;

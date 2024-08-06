import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

function NavBar() {
  // const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  });

  const getUser = async () => {
    if (!user) {
      const res = await axios.get("/api/auth");
      setUser(res.data.user);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/logout");
    if (res.data.success) {
      setUser(null);
      navigate("/home");
    }
  };

  return user ? (
    <Navbar>
      <Container>
        <Navbar.Brand href="/home">DnD Encounter Manager</Navbar.Brand>
        <Nav variant="tabs">
          <Nav.Link href="/encounters">Encounters</Nav.Link>
          <Button onClick={handleLogout}>Log Out</Button>
        </Nav>
      </Container>
    </Navbar>
  ) : (
    <Navbar>
      <Container>
        <Navbar.Brand href="/home">DnD Encounter Manager</Navbar.Brand>
        <Nav variant="tabs">
          <Nav.Link href="/encounters">Encounters</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;

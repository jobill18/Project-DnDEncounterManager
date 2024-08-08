import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button, Image } from "react-bootstrap";
import logo from "../assets/logo-white.png";

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
    <Navbar expand="md" sticky="top" bg="primary" variant="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/home" className="w-15">
          <Image src={logo} roundedCircle width={35} fluid />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end ms-auto text-end">
            <Nav.Link as={Link} to="/encounters">
              Encounters
            </Nav.Link>
            <Button className="text-end" onClick={handleLogout}>
              Log Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  ) : (
    <Navbar expand="md" sticky="top" bg="primary" variant="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/home">
          <Image src={logo} roundedCircle width={35} fluid />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end ms-auto text-end">
            <Nav.Link as={Link} to="/encounters">
              Encounters
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

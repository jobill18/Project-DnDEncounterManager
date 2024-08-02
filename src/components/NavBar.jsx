import axios from "axios";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

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
    <Container fluid>
      <Row>
        <Col xs="3">
          <h3>DnD Encounter Manager</h3>
        </Col>
        <Col xs="2">
          <Link to="/encounters">Encounters</Link>
        </Col>
        <Col xs="4"></Col>
        <Col xs="3">
          <button onClick={handleLogout}>Log Out</button>
        </Col>
      </Row>
    </Container>
  ) : (
    <Container fluid>
      <Row>
        <Col>
          <h3>DnD Encounter Manager</h3>
        </Col>
        <Col>
          <Link to="/encounters">Encounters</Link>
        </Col>
        <Col xs="4"></Col>
        <Col>
          <Link to="/login">Login</Link>
        </Col>
        <Col>
          <Link to="/register">Register</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default NavBar;

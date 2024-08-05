import axios from "axios";
import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function LoginForm() {
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e, formData) => {
    e.preventDefault();

    const res = await axios.post("/api/auth", formData);

    if (res.data.success) {
      dispatch({ type: "SET_USER", payload: res.data.userId });
      navigate("/encounters");
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h3>Login</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Please enter your username and password</p>
        </Col>
      </Row>
      <Form
        onSubmit={(e) => {
          handleLogin(e, {
            email: emailValue,
            password: passwordValue,
          });
        }}
      >
        <Form.Group className="login" controlId="email">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            name="email"
            id="email"
            type="email"
            required
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="login" controlId="password">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            name="password"
            id="password"
            type="password"
            required
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Log In</Button>
      </Form>
      <Row>
        <Col>
          <p>
            Click <Link to="/register">here</Link> to create a new account.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;

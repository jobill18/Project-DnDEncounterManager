import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!isEmailValid(value)) {
      setError("Invalid email format.");
    } else {
      setError("");
    }
  };

  const createUser = async (event) => {
    event.preventDefault();

    if (!error && password === password2) {
      const { data } = await axios.post("/api/user", {
        fname: fname,
        lname: lname,
        email: email,
        password: password,
      });
      if (!data.error) {
        navigate("/login");
      } else {
        alert(data.error);
      }
    } else {
      if (error) {
        alert("Please enter a valid email.");
      } else if (password !== password2) {
        alert("Make sure your password is the same in both fields.");
      }
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h3>Create Account</h3>
        </Col>
      </Row>
      <Form onSubmit={(e) => createUser(e)}>
        <Form.Group className="register" controlId="fname">
          <Form.Label>First Name: </Form.Label>
          <Form.Control
            name="fname"
            id="fname"
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="register" controlId="lname">
          <Form.Label>Last Name: </Form.Label>
          <Form.Control
            name="lname"
            id="lname"
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="register" controlId="email">
          <Form.Label>Email: </Form.Label>
          <Form.Control
            name="email"
            id="email"
            type="text"
            value={email}
            required
            onChange={handleEmailChange}
          />
        </Form.Group>
        <Form.Group className="register" controlId="password">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            name="password"
            id="password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="register" controlId="password2">
          <Form.Label>Re-enter Password: </Form.Label>
          <Form.Control
            name="password2"
            id="password2"
            type="password"
            value={password2}
            required
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
}

export default RegisterForm;

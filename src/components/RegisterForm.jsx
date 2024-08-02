import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
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
      <form onSubmit={(e) => createUser(e)}>
        <p>
          <label htmlFor="fname">First Name: </label>
          <input
            name="fname"
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="lname">Last Name: </label>
          <input
            name="lname"
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="email">Email: </label>
          <input
            name="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </p>
        <p>
          <label htmlFor="password">Password: </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="password2">Re-enter Password: </label>
          <input
            name="password2"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </p>
        <p>
          <button type="submit">Submit</button>
        </p>
      </form>
    </Container>
  );
}

export default RegisterForm;

import axios from "axios";
import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e, formData) => {
    e.preventDefault();

    const res = await axios.post("/api/auth", formData);

    if (res.data.success) {
      navigate("/encounters");
    }
  };

  return (
    <>
      <h3>Login</h3>
      <p>Please enter your username and password</p>
      <form
        onSubmit={(e) => {
          handleLogin(e, {
            email: emailValue,
            password: passwordValue,
          });
        }}
      >
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          id="email"
          type="text"
          required
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          id="password"
          type="password"
          required
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        <button type="submit">Log In</button>
      </form>
      <p>
        Click <Link to="/register">here</Link> to create a new account.
      </p>
    </>
  );
}

export default LoginForm;

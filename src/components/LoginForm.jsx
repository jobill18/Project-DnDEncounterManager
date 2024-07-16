import React from "react";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <>
      <h3>Login</h3>
      <p>Please enter your username and password</p>
      <form>
        <p>
          <label htmlFor="username">Email: </label>
          <input type="username" name="username" />
        </p>
        <p>
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" />
        </p>
        <button>Login</button>
      </form>
      <p>
        Click <Link to="/register">here</Link> to create a new account.
      </p>
    </>
  );
}

export default LoginForm;

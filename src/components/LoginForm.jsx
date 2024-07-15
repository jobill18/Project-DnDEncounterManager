import React from "react";

function LoginForm() {
  return (
    <>
      <h3>Login</h3>
      <p>Please enter your username and password</p>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" />
        <button>Login</button>
      </form>
      <p>
        Click <button>here</button> to create a new account.
      </p>
    </>
  );
}

export default LoginForm;

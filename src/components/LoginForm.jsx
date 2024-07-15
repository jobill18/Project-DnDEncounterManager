import React from "react";

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
        Click <button>here</button> to create a new account.
      </p>
    </>
  );
}

export default LoginForm;

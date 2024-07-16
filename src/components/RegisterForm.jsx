import React from "react";

function RegisterForm() {
  return (
    <>
      <h3>Create Account</h3>
      <form>
        <p>
          <label htmlFor="">First Name: </label>
          <input type="text" />
        </p>
        <p>
          <label htmlFor="">Last Name: </label>
          <input type="text" />
        </p>
        <p>
          <label htmlFor="">Email: </label>
          <input type="text" />
        </p>
        <p>
          <label htmlFor="">Password: </label>
          <input type="text" />
        </p>
        <p>
          <label htmlFor="">Re-enter Password: </label>
          <input type="text" />
        </p>
        <p>
          <button type="submit">Submit</button>
        </p>
      </form>
    </>
  );
}

export default RegisterForm;

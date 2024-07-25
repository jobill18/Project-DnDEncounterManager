import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();

  const createUser = async (event) => {
    event.preventDefault();

    if (email.includes("@") && password === password2) {
      const { data } = await axios.post("/api/user", {
        fname: fname,
        lname: lname,
        email: email,
        password: password,
      });
      console.log(data);
      if (!data.error) {
        navigate("/login");
      } else {
        // console.log(data);
        // alert(data.error);
      }
    } else {
      if (!email.includes("@")) {
        alert("Please enter a valid email.");
      } else if (password !== password) {
        alert("Make sure your password is the same in both fields.");
      }
    }
  };

  return (
    <>
      <h3>Create Account</h3>
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
            onChange={(e) => setEmail(e.target.value)}
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
    </>
  );
}

export default RegisterForm;

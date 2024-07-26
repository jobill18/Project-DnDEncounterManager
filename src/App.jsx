import axios from "axios";
import "./App.css";
// import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
// import { useNavigate } from "react-router-dom";

function App(data) {
  // const [user, setUser] = useState("");
  // const navigate = useNavigate();

  // const handleLogin = async (e, formData) => {
  //   e.preventDefault();

  //   const res = await axios.post("/api/auth", formData);

  //   if (res.data.success) {
  //     setUser(res.data.userId);
  //     navigate("/encounters");
  //   }
  // };

  return (
    <>
      <NavBar />
      <Outlet data={data} />
    </>
  );
}

export default App;

// import "./App.css";
// import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
// import { useNavigate } from "react-router-dom";

function App(data) {
  return (
    <>
      <NavBar />
      <Outlet data={data} />
    </>
  );
}

export default App;

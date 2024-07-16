import "./App.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";

function App(data) {
  return (
    <>
      <NavBar />
      <Outlet data={data} />
    </>
  );
}

export default App;

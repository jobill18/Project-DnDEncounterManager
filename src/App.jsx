import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PreviewEncounterTable from "./components/PreviewEncounterTable.jsx";
import DetailedEncounterTable from "./components/DetailedEncounterTable.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PreviewEncounterTable />
      <DetailedEncounterTable />
      <LoginForm />
      <RegisterForm />
    </>
  );
}

export default App;

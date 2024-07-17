import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import DetailedView from "./components/DetailedView.jsx";
import Preview from "./components/Preview.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import EditEncounter from "./components/EditEncounter.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="/encounters"
        element={<Preview />}
        loader={async () => {
          const res = await axios.get("/api/encounters");
          return { encounters: res.data };
        }}
      />
      <Route
        path="/encounters/:encounter_id"
        element={<DetailedView />}
        loader={async () => {
          const res = await axios.get("/api/encounters/:encounterId");
          return { encounters: res.data };
        }}
      />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/encounters/:encounter_id/edit"
        element={<EditEncounter />}
        loader={async () => {
          const res = await axios.get("https://www.dnd5eapi.co/api/monsters");
          return { monsters: res.data };
        }}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import store from "./reducers/store.js";
import App from "./App.jsx";
// import "./index.css";
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
import Homepage from "./components/Homepage.jsx";
import { Provider } from "react-redux";
import "../scss/custom.scss";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/home" element={<Homepage />} />
      <Route
        path="/encounters"
        element={<Preview />}
        loader={async () => {
          const res = await axios.get("/api/encounters");
          return { encounters: res.data };
        }}
      />
      <Route
        path="/encounters/:encounterId"
        element={<DetailedView />}
        loader={async ({ params }) => {
          const encounter = await axios.get(
            `/api/encounters/${params.encounterId}`
          );
          const monsterData = await axios.get(
            "https://www.dnd5eapi.co/api/monsters"
          );
          return {
            monsterEntries: encounter.data.monsters,
            encounter: encounter.data.encounter,
            monsterData: monsterData.data,
          };
        }}
      />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

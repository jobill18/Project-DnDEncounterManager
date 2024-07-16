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
import SavedDetailed from "./components/SavedDetailed.jsx";
import SavedPreview from "./components/SavedPreview.jsx";
import GeneratedDetailed from "./components/GeneratedDetailed.jsx";
import GeneratedPreview from "./components/GeneratedPreview.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import EditEncounter from "./components/EditEncounter.jsx";

const data = {
  count: 6,
  results: [
    {
      index: "aboleth",
      name: "Aboleth",
      url: "/api/monsters/aboleth",
    },
    {
      index: "acolyte",
      name: "Acolyte",
      url: "/api/monsters/acolyte",
    },
    {
      index: "adult-black-dragon",
      name: "Adult Black Dragon",
      url: "/api/monsters/adult-black-dragon",
    },
    {
      index: "adult-blue-dragon",
      name: "Adult Blue Dragon",
      url: "/api/monsters/adult-blue-dragon",
    },
    {
      index: "adult-brass-dragon",
      name: "Adult Brass Dragon",
      url: "/api/monsters/adult-brass-dragon",
    },
    {
      index: "adult-bronze-dragon",
      name: "Adult Bronze Dragon",
      url: "/api/monsters/adult-bronze-dragon",
    },
  ],
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App data={data} />}>
      <Route path="/myencounters" element={<SavedPreview />} />
      <Route path="/myencounters/:encounter_id" element={<SavedDetailed />} />
      <Route path="/encounters" element={<GeneratedPreview />} />
      <Route path="/encounters/:encounter_id" element={<GeneratedDetailed />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/myencounters/:encounter_id/edit"
        element={<EditEncounter data={data} />}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

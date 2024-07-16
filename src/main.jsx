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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/myencounters" element={<SavedPreview />} />
      <Route path="/myencounters/:encounter_id" element={<SavedDetailed />} />
      <Route path="/encounters" element={<GeneratedPreview />} />
      <Route path="/encounters/:encounter_id" element={<GeneratedDetailed />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/myencounters/:encounter_id/edit"
        element={<EditEncounter />}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

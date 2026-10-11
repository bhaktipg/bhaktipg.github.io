import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Content renders after the browser's initial anchor jump, so honor deep links (#projects) once mounted.
if (location.hash) {
  requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView());
}

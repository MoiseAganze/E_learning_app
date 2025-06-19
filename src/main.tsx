import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Gestion globale des erreurs de réseau pour éviter les erreurs non gérées
window.addEventListener("unhandledrejection", (event) => {
  // Ignore les erreurs de fetch liées au HMR et aux services externes
  if (
    event.reason?.message?.includes("Failed to fetch") ||
    event.reason?.message?.includes("fetch")
  ) {
    console.warn("Network error ignored:", event.reason?.message);
    event.preventDefault();
  }
});

// Gestion des erreurs JavaScript non gérées
window.addEventListener("error", (event) => {
  // Ignore les erreurs liées aux services externes comme FullStory
  if (
    event.error?.stack?.includes("fullstory") ||
    event.error?.stack?.includes("fs.js")
  ) {
    console.warn("External service error ignored:", event.error?.message);
    event.preventDefault();
  }
});

createRoot(document.getElementById("root")!).render(<App />);

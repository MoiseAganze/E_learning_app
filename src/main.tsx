import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Initialiser le gestionnaire d'erreurs global
import "./lib/errorHandler";

createRoot(document.getElementById("root")!).render(<App />);

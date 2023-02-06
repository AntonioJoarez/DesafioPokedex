import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PokemonsProvider } from "./contexts/PokemonsContext";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <PokemonsProvider>
      <App />
    </PokemonsProvider>
  </BrowserRouter>
);

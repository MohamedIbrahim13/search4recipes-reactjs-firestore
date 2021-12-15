import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ThemeContextPovider from "./context/ThemeContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextPovider>
      <App />
    </ThemeContextPovider>
  </React.StrictMode>,
  document.getElementById("root")
);

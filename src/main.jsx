import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputScreen from "./input_screen";
import ResultScreen from "./output_screen";
import "./styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputScreen />} />
        <Route path="/result" element={<ResultScreen />} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

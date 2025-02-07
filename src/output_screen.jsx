import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./output.css"; // Import this CSS

function OutputScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state || {};

  return (
    <div className="output-container">
      <h1>Calculation Results</h1>
      <div className="result-card">
        <div className="result-item">Total Plates Required: {results.totalPlatesRequired}</div>
      </div>
      <button className="back-button" onClick={() => navigate("/")}>Back</button>
    </div>
  );
}

export default OutputScreen;

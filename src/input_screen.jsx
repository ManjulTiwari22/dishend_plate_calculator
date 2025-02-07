import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Adjusted path to ensure styles.css is found

const calculatePlates = ({
  internalDiameter,
  plateWidth,
  plateLength,
  numPetals,
  straightFlange,
}) => {
  const pi = Math.PI;

  // 1. Calculate Surface Area
  const crownArea = 2 * pi * Math.pow(internalDiameter / 2, 2);
  const petalArea = (numPetals / 20) * crownArea * (1 + (straightFlange / internalDiameter));
  const totalSurfaceArea = crownArea + petalArea;

  // 2. Calculate Usable Plate Area
  const plateArea = plateWidth * plateLength;
  const usablePlateArea = plateArea * 0.9;

  // 3. Estimate Plate Count
  const initialPlateCount = totalSurfaceArea / usablePlateArea;
  let adjustedPlateCount;

  if (initialPlateCount <= 0.5) {
    adjustedPlateCount = 0.5;
  } else if (initialPlateCount <= 1) {
    adjustedPlateCount = 1.0;
  } else if (initialPlateCount <= 1.5) {
    adjustedPlateCount = 1.5;
  } else if (initialPlateCount <= 2) {
    adjustedPlateCount = 2.0;
  } else {
    adjustedPlateCount = Math.ceil(initialPlateCount * 2) / 2.0; // Round up to nearest 0.5
  }

  return {
    crownArea,
    petalArea,
    totalSurfaceArea,
    usablePlateArea,
    totalPlatesRequired: adjustedPlateCount,
  };
};

function InputScreen() {
  const [internalDiameter, setInternalDiameter] = useState("");
  const [plateWidth, setPlateWidth] = useState("");
  const [plateLength, setPlateLength] = useState("");
  const [numPetals, setNumPetals] = useState("");
  const [straightFlange, setStraightFlange] = useState("");

  const navigate = useNavigate();

  const handleCalculate = () => {
    const results = calculatePlates({
      internalDiameter: parseFloat(internalDiameter) || 0,
      plateWidth: parseFloat(plateWidth) || 0,
      plateLength: parseFloat(plateLength) || 0,
      numPetals: parseInt(numPetals) || 0,
      straightFlange: parseFloat(straightFlange) || 0,
    });

    navigate("/result", { state: results });
  };

  return (
    <div className="input-container">
      <h1>Crown & Petal Type Dishend</h1>
      <input
        type="number"
        placeholder="Internal Diameter (mm)"
        value={internalDiameter}
        onChange={(e) => setInternalDiameter(e.target.value)} />
      <input
        type="number"
        placeholder="Plate Width (mm)"
        value={plateWidth}
        onChange={(e) => setPlateWidth(e.target.value)} />
      <input
        type="number"
        placeholder="Plate Length (mm)"
        value={plateLength}
        onChange={(e) => setPlateLength(e.target.value)} />
      <input
        type="number"
        placeholder="Number of Petals"
        value={numPetals}
        onChange={(e) => setNumPetals(e.target.value)} />
      <input
        type="number"
        placeholder="Straight Flange (mm)"
        value={straightFlange}
        onChange={(e) => setStraightFlange(e.target.value)} />
      <button onClick={handleCalculate}>Calculate</button>
    </div>
  );
}

export default InputScreen;

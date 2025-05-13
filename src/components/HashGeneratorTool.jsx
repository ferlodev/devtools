// src/components/HashGeneratorTool.js
import React, { useState } from "react";
import { generateHash } from "../utils/cryptoUtils";

const HashGeneratorTool = () => {
  const [inputText, setInputText] = useState("");
  const [algorithm, setAlgorithm] = useState("SHA-256");
  const [hashOutput, setHashOutput] = useState("");
  const [error, setError] = useState("");

  const handleGenerateHash = async () => {
    setError("");
    if (!inputText) {
      setHashOutput("");
      return;
    }
    try {
      const hash = await generateHash(inputText, algorithm);
      setHashOutput(hash);
    } catch (err) {
      console.error("Error in handleGenerateHash:", err);
      setError(`Error al generar el hash ${algorithm}: ${err.message}`);
      setHashOutput("");
    }
  };

  return (
    <section id="hash-generator" className="tool-section">
      <h3>Generador de Hash</h3>
      <div className="form-group">
        <label htmlFor="hash-input-text">Texto a hashear:</label>
        <textarea
          id="hash-input-text"
          rows="5"
          placeholder="Escribe o pega texto aquí..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="hash-algorithm-generate">Algoritmo:</label>
        <select
          id="hash-algorithm-generate"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="MD5">MD5</option>
          <option value="SHA-1">SHA-1</option>
          <option value="SHA-256">SHA-256</option>
          <option value="SHA-512">SHA-512</option>
        </select>
      </div>
      <div className="button-group">
        <button onClick={handleGenerateHash}>Generar Hash</button>
      </div>
      <div className="form-group">
        <label htmlFor="hash-output">Hash Resultante:</label>
        <input
          type="text"
          id="hash-output"
          readOnly
          placeholder="Hash..."
          value={hashOutput}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
    </section>
  );
};

export default HashGeneratorTool;

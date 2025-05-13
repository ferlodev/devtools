// src/components/HashValidatorTool.js
import React, { useState } from "react";
import { generateHash } from "../utils/cryptoUtils";

const HashValidatorTool = () => {
  const [originalText, setOriginalText] = useState("");
  const [hashToValidate, setHashToValidate] = useState("");
  const [algorithm, setAlgorithm] = useState("SHA-256");
  const [validationResult, setValidationResult] = useState({
    status: "neutral",
    message: "Esperando validación...",
  }); // neutral, valid, invalid
  const [error, setError] = useState("");

  const handleValidateHash = async () => {
    setError("");
    if (!originalText || !hashToValidate) {
      setValidationResult({
        status: "neutral",
        message: "Por favor, ingresa el texto original y el hash a validar.",
      });
      return;
    }

    try {
      const calculatedHash = await generateHash(originalText, algorithm);
      if (
        calculatedHash.toLowerCase() === hashToValidate.toLowerCase().trim()
      ) {
        setValidationResult({ status: "valid", message: "¡Hash VÁLIDO!" });
      } else {
        setValidationResult({
          status: "invalid",
          message: "Hash INVÁLIDO. El hash calculado no coincide.",
        });
      }
    } catch (err) {
      console.error("Error in handleValidateHash:", err);
      setError(`Error al validar el hash: ${err.message}`);
      setValidationResult({
        status: "neutral",
        message: "Error durante la validación.",
      });
    }
  };

  return (
    <section id="hash-validator" className="tool-section">
      <h3>Validador de Hash</h3>
      <div className="form-group">
        <label htmlFor="validate-text-input">Texto Original:</label>
        <textarea
          id="validate-text-input"
          rows="4"
          placeholder="Escribe o pega el texto original..."
          value={originalText}
          onChange={(e) => setOriginalText(e.target.value)}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="validate-hash-input">Hash a Validar:</label>
        <input
          type="text"
          id="validate-hash-input"
          placeholder="Pega el hash aquí..."
          value={hashToValidate}
          onChange={(e) => setHashToValidate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="hash-algorithm-validate">Algoritmo del Hash:</label>
        <select
          id="hash-algorithm-validate"
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
        <button onClick={handleValidateHash}>Validar Hash</button>
      </div>
      <div className="form-group">
        <label>Resultado de Validación:</label>
        <div className={`validation-status ${validationResult.status}`}>
          {validationResult.message}
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
    </section>
  );
};

export default HashValidatorTool;

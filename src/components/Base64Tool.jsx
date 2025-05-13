// src/components/Base64Tool.js
import React, { useState } from "react";
import { encodeBase64, decodeBase64 } from "../utils/cryptoUtils";

const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleEncode = () => {
    setError("");
    if (!input) {
      setOutput("");
      return;
    }
    const encoded = encodeBase64(input);
    if (encoded === null) {
      setError(
        "Error al codificar: La entrada podría no ser una cadena UTF-8 válida."
      );
      setOutput("");
    } else {
      setOutput(encoded);
    }
  };

  const handleDecode = () => {
    setError("");
    if (!input) {
      setOutput("");
      return;
    }
    const decoded = decodeBase64(input);
    if (decoded === null) {
      setError(
        "Error al decodificar: La entrada podría no ser una cadena Base64 válida."
      );
      setOutput("");
    } else {
      setOutput(decoded);
    }
  };

  return (
    <section id="base64" className="tool-section">
      <h3>Codificador/Decodificador Base64</h3>
      <div className="form-group">
        <label htmlFor="base64-input">Entrada:</label>
        <textarea
          id="base64-input"
          rows="5"
          placeholder="Escribe o pega texto aquí..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
      </div>
      <div className="button-group">
        <button onClick={handleEncode}>Codificar</button>
        <button onClick={handleDecode}>Decodificar</button>
      </div>
      <div className="form-group">
        <label htmlFor="base64-output">Salida:</label>
        <textarea
          id="base64-output"
          rows="5"
          readOnly
          placeholder="Resultado..."
          value={output}
        ></textarea>
      </div>
      {error && <div className="error-message">{error}</div>}
    </section>
  );
};

export default Base64Tool;

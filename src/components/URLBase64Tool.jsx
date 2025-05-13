// src/components/URLBase64Tool.js
import React, { useState } from "react";
import { encodeURLBase64, decodeURLBase64 } from "../utils/cryptoUtils";

const URLBase64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleEncode = () => {
    setError("");
    if (!input) {
      setOutput("");
      return;
    }
    const encoded = encodeURLBase64(input);
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
    const decoded = decodeURLBase64(input);
    if (decoded === null) {
      setError(
        "Error al decodificar: La entrada podría no ser una cadena URLBase64 válida."
      );
      setOutput("");
    } else {
      setOutput(decoded);
    }
  };

  return (
    <section id="urlbase64" className="tool-section">
      <h3>Codificador/Decodificador URLBase64</h3>
      <p className="info-text">
        Codificación Base64 segura para URLs (RFC 4648 &sect;5). Reemplaza '+'
        por '-', '/' por '_', y elimina el padding '='.
      </p>
      <div className="form-group">
        <label htmlFor="urlbase64-input">Entrada:</label>
        <textarea
          id="urlbase64-input"
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
        <label htmlFor="urlbase64-output">Salida:</label>
        <textarea
          id="urlbase64-output"
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

export default URLBase64Tool;

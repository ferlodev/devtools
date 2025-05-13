// src/App.js
import React, { useState, useEffect } from "react";
import "./theme.css"; // Import theme variables first
import "./App.css"; // Import global styles
import Sidebar from "./components/Sidebar";
import Base64Tool from "./components/Base64Tool";
import URLBase64Tool from "./components/URLBase64Tool";
import HashGeneratorTool from "./components/HashGeneratorTool";
import HashValidatorTool from "./components/HashValidatorTool";

function App() {
  // State for the current theme (light/dark)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light"; // Default to light theme
  });

  // State for the currently active tool
  const [activeTool, setActiveTool] = useState("base64"); // Default tool

  // Effect to apply the theme to the body and save it to localStorage
  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-theme" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Function to render the currently selected tool
  const renderActiveTool = () => {
    switch (activeTool) {
      case "base64":
        return <Base64Tool />;
      case "urlbase64":
        return <URLBase64Tool />;
      case "hash-generator":
        return <HashGeneratorTool />;
      case "hash-validator":
        return <HashValidatorTool />;
      default:
        return <Base64Tool />; // Fallback to Base64 tool
    }
  };

  return (
    <div className="container">
      <Sidebar
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="content">{renderActiveTool()}</main>
    </div>
  );
}

export default App;

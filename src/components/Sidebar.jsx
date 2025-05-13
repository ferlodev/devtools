// src/components/Sidebar.js
import React from "react";
import ThemeToggle from "./ThemeToggle";

const Sidebar = ({ activeTool, setActiveTool, theme, toggleTheme }) => {
  const menuItems = [
    { id: "base64", label: "Base64" },
    { id: "urlbase64", label: "URLBase64" },
    { id: "hash-generator", label: "Generar Hash" },
    { id: "hash-validator", label: "Validar Hash" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>DevTools</h2>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeTool === item.id ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTool(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

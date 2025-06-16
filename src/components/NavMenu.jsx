import React from 'react';
import AddMenuPopup from '../popups/AddMenuPopup';

export default function NavMenu({ setActivePopup, activePopup, setView }) {
  const navStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60px",
    background: "#111",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    zIndex: 999
  };

  const addMenuStyle = {
    position: "fixed",
    bottom: "60px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#222",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    padding: "10px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    zIndex: 1000
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "1.2rem",
    cursor: "pointer"
  };

  return (
    <>
      <div style={navStyle}>
        <button onClick={() => setView('home')} style={buttonStyle}>🏠</button>
        <button onClick={() => setView ('shopping')} style={buttonStyle}>🛒</button>
        <button
          onClick={() => setActivePopup(activePopup === 'addMenu' ? null : 'addMenu')}
          style={buttonStyle}
        >
          ➕
        </button>
        <button onClick={() => setActivePopup('group')} style={buttonStyle}>👥</button>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setActivePopup(null); // opcional: cierra cualquier popup abierto
          }}
          style={buttonStyle}
        >
          📤
        </button>
      </div>

{activePopup === 'addMenu' && (
  <AddMenuPopup setActivePopup={setActivePopup} />
)}
    </>
  );
}

import React from 'react';

export default function MoreMenuPopup({ setActivePopup, setEditingTitle }) {
  const containerStyle = {
    position: 'fixed',
    bottom: 70,
    right: 10,
    background: '#222',
    borderRadius: 12,
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    padding: '10px 14px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    minWidth: 160,
  };

  const buttonStyle = {
    background: 'none',
    border: 'none',
    color: '#fff',
    textAlign: 'left',
    fontSize: '0.9rem',
    cursor: 'pointer',
    padding: 4,
  };

  return (
    <nav style={containerStyle} aria-label="More options">
      <button
        type="button"
        style={buttonStyle}
        onClick={() => setActivePopup("group")}
      >
        👥 Manage Group Members
      </button>
      <button
        type="button"
        style={buttonStyle}
        onClick={() => {
          setEditingTitle(true);
          setActivePopup(null);
        }}
      >
        ✏️ Change Title
      </button>
      <button
        type="button"
        style={buttonStyle}
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setActivePopup(null);
        }}
      >
        🔗 Share this trip
      </button>
      <button
        type="button"
        style={buttonStyle}
        onClick={() => {
          alert("Coming soon");
          setActivePopup(null);
        }}
      >
        💖 Donate to creator
      </button>
    </nav>
  );
}
import React from 'react';

export default function PopupWrapper({ title, onClose, children }) {
  return (
    <div style={overlayStyle}>
      <div style={popupStyle}>
        <div style={headerStyle}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={closeButtonStyle} title="Close">✖</button>
        </div>
        <div style={{ marginTop: 10 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
  padding: 20,
};

const popupStyle = {
   background: '#222',
  borderRadius: 12,
  padding: 20,
  width: '90vw',           // ⬅️ limit width on mobile
  maxWidth: 400,           // ⬅️ don't go wider on desktop
  maxHeight: '90vh',       // ⬅️ prevent height overflow
  overflowY: 'auto',       // ⬅️ scroll inside popup if too tall
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  animation: 'fadeIn 0.2s ease-out',
  boxSizing: 'border-box', // ⬅️ important to include padding in width
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '1.2rem',
  cursor: 'pointer',
  color: '#666',
};

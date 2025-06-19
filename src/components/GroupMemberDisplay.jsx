import React from "react";


export default function GroupMembersDisplay({ people, editMode, onRemove, onToggleEdit }) {
  const capitalizar = name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return (
    <div style={{ marginTop: 10 }}>
      {editMode ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {people.map(p => (
            <span key={p} style={{
              padding: '6px 10px',
              background: '#ffff',
              borderRadius: '80px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.95rem'
            }}>
              {capitalizar(p)}
              <button onClick={() => onRemove(p)} style={{
                marginLeft: 6,
                border: 'none',
                background: 'transparent',
                color: 'hotpink',
                fontSize: '1rem',
                cursor: 'pointer'
              }}>
                ❌
              </button>
            </span>
          ))}
          <div>
            <button onClick={onToggleEdit} style={{
              padding: '6px 12px',
              background: '#eee',
              borderRadius: '8px',
              border: '1px solid #ccc',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}>
              ✅ Done Editing
            </button>
          </div>
        </div>
      ) : (
        <div>
          <strong>Members:</strong>{" "}
          {people.map(capitalizar).join(", ")}
        </div>
      )}
    </div>
  );
}

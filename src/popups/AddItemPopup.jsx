import React, { useState } from 'react';
import PopupWrapper from '../popups/PopupWrapper';

export default function AddItemPopup({ people, onAdd, onClose }) {
  const [item, setItem] = useState({
    name: '',
    quantity: '',
    storeTag: '',
    useTag: '',
    assignedTo: ''
  });

  const handleSubmit = () => {
    if (!item.name) return;
    onAdd(item);
    onClose();
  };

  return (
    <PopupWrapper title="Add Item" onClose={onClose}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          Item name:
          <input value={item.name} onChange={e => setItem({ ...item, name: e.target.value })} />
        </label>

        <label>
          Quantity:
          <input value={item.quantity} onChange={e => setItem({ ...item, quantity: e.target.value })} />
        </label>

        <label>
          Store:
          <input value={item.storeTag} onChange={e => setItem({ ...item, storeTag: e.target.value })} />
        </label>

        <label>
          Use tag:
          <input value={item.useTag} onChange={e => setItem({ ...item, useTag: e.target.value })} />
        </label>

        <label>
          Assign to:
          <select
            value={item.assignedTo}
            onChange={e => setItem({ ...item, assignedTo: e.target.value })}
          >
            <option value="">Anyone</option>
            {people.map(p => <option key={p}>{p}</option>)}
          </select>
        </label>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </PopupWrapper>
  );
}

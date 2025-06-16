import React from 'react';
import PopupWrapper from './PopupWrapper';

export default function AddMenuPopup({ setActivePopup }) {
  return (
    <PopupWrapper title="Add..." onClose={() => setActivePopup(null)}>
      <button onClick={() => setActivePopup('addExpense')}>➕ Expense</button>
      <button onClick={() => setActivePopup('addItem')}>➕ Item</button>
    </PopupWrapper>
  );
}

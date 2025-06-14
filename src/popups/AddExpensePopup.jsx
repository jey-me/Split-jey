import React, { useState } from 'react';
import PopupWrapper from '../popups/PopupWrapper';

export default function AddExpensePopup({ people, onAdd, onClose }) {
  const [expense, setExpense] = useState({
    name: '',
    amount: '',
    paid_by: '',
    split_between: []
  });

  const toggleSplitPerson = (person) => {
    setExpense((prev) => {
      const included = prev.split_between.includes(person);
      return {
        ...prev,
        split_between: included
          ? prev.split_between.filter(p => p !== person)
          : [...prev.split_between, person]
      };
    });
  };

  const handleSubmit = () => {
    if (!expense.name || !expense.amount || !expense.paid_by) return;
    onAdd({
      ...expense,
      amount: parseFloat(expense.amount),
      split_between: expense.split_between.length ? expense.split_between : [...people]
    });
    onClose();
  };

  return (
    <PopupWrapper title="Add Expense" onClose={onClose}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label>
          Expense name:
          <input
            value={expense.name}
            onChange={e => setExpense({ ...expense, name: e.target.value })}
          />
        </label>

        <label>
          Amount:
          <input
            type="number"
            value={expense.amount}
            onChange={e => setExpense({ ...expense, amount: e.target.value })}
          />
        </label>

        <label>
          Paid by:
          <select
            value={expense.paid_by}
            onChange={e => setExpense({ ...expense, paid_by: e.target.value })}
          >
            <option value="">Select</option>
            {people.map(p => <option key={p}>{p}</option>)}
          </select>
        </label>

        <div>
          <p style={{ margin: 0 }}>Split between:</p>
          {people.map(p => (
            <label key={p} style={{ marginRight: 10 }}>
              <input
                type="checkbox"
                checked={expense.split_between.includes(p)}
                onChange={() => toggleSplitPerson(p)}
              />
              {p}
            </label>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </PopupWrapper>
  );
}

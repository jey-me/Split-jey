import React, { useState } from "react";
import PopupWrapper from "../popups/PopupWrapper";

export default function AddExpensePopup({ people, onAdd, onClose }) {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    paid_by: "",
    split_between: [],
  });

  const toggleSplitPerson = (person) => {
    setExpense((prev) => {
      const included = prev.split_between.includes(person);
      return {
        ...prev,
        split_between: included
          ? prev.split_between.filter((p) => p !== person)
          : [...prev.split_between, person],
      };
    });
  };

  const [errors, setErrors] = useState({});
  const handleSubmit = () => {
    const newErrors = {};
    if (!expense.name.trim()) newErrors.name = "Obligatorio";
    if (!expense.amount || isNaN(parseFloat(expense.amount)) || parseFloat(expense.amount) <= 0) {
    newErrors.amount = 'Enter valid number';}
if (!expense.paid_by.trim()) newErrors.paid_by = 'Required';

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    setTimeout(() => setErrors({}), 2000);
    return;
  }

onAdd({
    name: expense.name.trim(),
    amount: parseFloat(expense.amount),
    paid_by: expense.paid_by,
    split_between: expense.split_between.length
      ? expense.split_between
      : [...people]
  });

    onClose();
  };

  return (
    <PopupWrapper title="Add Expense" onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label>
          Expense name:
          <input
            value={expense.name}
            required
            onChange={(e) => setExpense({ ...expense, name: e.target.value })}
            style={{
              width: "100%",
              marginTop: 4,
              border: errors.name ? "1px solid red" : "1px solid #ccc",
              padding: "6px",
            }}
          />
          {errors.name && (
            <div
              style={{
                color: "red",
                fontSize: "0.75rem",
                marginTop: 4,
                opacity: 0.8,
              }}
            >
              {errors.name}
            </div>
          )}
        </label>

        <label>
          Amount:
          <input
            type="number"
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            style={{
              width: "100%",
              marginTop: 4,
              border: errors.amount ? "1px solid red" : "1px solid #ccc",
              padding: "6px",
            }}
          />
          {errors.amount && (
            <div
              style={{
                color: "red",
                fontSize: "0.75rem",
                marginTop: 4,
                opacity: 0.8,
              }}
            >
              {errors.amount}
            </div>
          )}
        </label>

        <label>
          Paid by:
          <select
            value={expense.paid_by}
            onChange={(e) =>
              setExpense({ ...expense, paid_by: e.target.value })
            }
            style={{
              width: "100%",
              marginTop: 4,
              border: !expense.paid_by ? "1px solid red" : "1px solid #ccc",
              padding: "6px",
            }}
          >
            <option value="">Select</option>
            {people.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          {errors.paid_by && (
            <div
              style={{
                color: "red",
                fontSize: "0.75rem",
                marginTop: 4,
                opacity: 0.8,
              }}
            >
              {errors.paid_by}
            </div>
          )}{" "}
        </label>

        <div>
          <p style={{ margin: 0 }}>Split between:</p>
          {people.map((p) => (
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

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </PopupWrapper>
  );
}

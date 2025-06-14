import React, { useState } from "react";
import ShoppingList from "./ShoppingList";

export default function ExpenseSplitter() {
  const [tripTitle, setTripTitle] = useState("");
  const [editingTitle, setEditingTitle] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showGroupMenu, setShowGroupMenu] = useState(false);
  const [people, setPeople] = useState([]);
  const capitalizarNombre = (nombre) =>
    nombre.charAt(0).toUpperCase() + 
    nombre.slice(1).toLowerCase();
  const [newPerson, setNewPerson] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    paid_by: "",
    amount: "",
    split_between: [],
  });
  const [transactions, setTransactions] = useState([]);
  const [items, setItems] = useState([]);
  const handleAddPerson = () => {
    if (newPerson && !people.includes(newPerson)) {
      setPeople([...people, newPerson]);
      setNewPerson("");
    }
  };
  const handleAddExpense = () => {
    if (!newExpense.paid_by || !newExpense.amount) return;
    const parsedAmount = parseFloat(newExpense.amount);
    if (isNaN(parsedAmount)) return;

    setExpenses([
      ...expenses,
      {
        paid_by: newExpense.paid_by,
        amount: parsedAmount,
        split_between: newExpense.split_between.length
          ? newExpense.split_between
          : [...people],
      },
    ]);
    setNewExpense({ paid_by: "", amount: "", split_between: [] });
  };

  const toggleSplitPerson = (person) => {
    setNewExpense((prev) => {
      const alreadyIncluded = prev.split_between.includes(person);
      return {
        ...prev,
        split_between: alreadyIncluded
          ? prev.split_between.filter((p) => p !== person)
          : [...prev.split_between, person],
      };
    });
  };

  const simplifyExpenses = () => {
    const balances = {};
    people.forEach((person) => (balances[person] = 0));

    for (const expense of expenses) {
      const { paid_by, amount, split_between } = expense;
      const splitAmount = amount / split_between.length;
      split_between.forEach((person) => (balances[person] -= splitAmount));
      balances[paid_by] += amount;
    }

    for (const person in balances) {
      balances[person] = Math.round(balances[person] * 100) / 100;
    }

    const creditors = [];
    const debtors = [];

    for (const person in balances) {
      const balance = balances[person];
      if (balance > 0) creditors.push({ person, amount: balance });
      else if (balance < 0) debtors.push({ person, amount: -balance });
    }

    const simplified = [];
    let i = 0,
      j = 0;
    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];
      const settledAmount = Math.min(debtor.amount, creditor.amount);

      simplified.push({
        from: debtor.person,
        to: creditor.person,
        amount: settledAmount.toFixed(2),
      });

      debtor.amount -= settledAmount;
      creditor.amount -= settledAmount;

      if (Math.abs(debtor.amount) < 0.01) i++;
      if (Math.abs(creditor.amount) < 0.01) j++;
    }

    setTransactions(simplified);
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "auto",
        padding: 20,
        fontFamily: "sans-serif",
      }}
    >
      {/* App label */}
      <h3
        style={{
          fontSize: "1.1rem",
          fontWeight: 500,
          opacity: 0.5,
          marginBottom: 1,
          textAlign: "center",
        }}
      >
        splitter by jey
      </h3>

      {/* Trip name input */}
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {editingTitle ? (
          <input
            autoFocus
            value={tripTitle}
            onChange={(e) => setTripTitle(e.target.value)}
            onBlur={() => {
              if (tripTitle.trim() !== "") setEditingTitle(false);
            }}
            placeholder="Enter trip name..."
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              width: "100%",
              padding: "6px 10px",
              border: "1px solid #ccc",
              borderRadius: 6,
            }}
          />
        ) : (
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              flex: 1,
              paddingLeft: 4,
            }}
          >
            {tripTitle}
            <button
              onClick={() => setEditingTitle(true)}
              title="Edit trip name"
              style={{
                marginLeft: 12,
                fontSize: "1rem",
                background: "none",
                border: "none",
                color: "#666",
                cursor: "pointer",
              }}
            >
              ✏️
            </button>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <h3 style={{ margin: 0 }}>Group Members</h3>
        <button
          onClick={() => setShowGroupMenu(!showGroupMenu)}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.4rem",
            cursor: "pointer",
          }}
          title="Manage group"
        >
          ⚙️
        </button>
      </div>
<div style={{ marginTop: 10 }}>
  {" "}
  {people.map((p, index) => (
    <span key={p} style={{ display: 'inline-flex', alignItems: 'center' }}>
      {capitalizarNombre(p)}
      {editMode && (
        <button
          onClick={() => {
            if (window.confirm(`Remove ${p}?`)) {
              setPeople(people.filter(name => name !== p));
            }
          }}
          style={{
            padding: 2,
            border: 'none',
            background: 'transparent',
            color: 'hotpink',
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          ❌
        </button>
      )}
      {index < people.length - 1 ? ',\u00A0' : ''}
    </span>
  ))}
</div>


{editMode && (
  <div style={{ marginTop: 10 }}>
    <button
      onClick={() => setEditMode(false)}
      style={{
        padding: '6px 12px',        
        borderRadius: '8px',
        border: '1px solid #ccc',
        cursor: 'pointer',
        fontSize: '0.9rem'
      }}
    >
      ✅ Done Editing
    </button>
  </div>
)}


      {showGroupMenu && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "6px",
            padding: "8px",
            marginTop: 8,
            width: "fit-content",
          }}
        >
          <button
            onClick={() => {
              const input = prompt("Enter name(s), separated by commas:");
              if (!input) return;

            const newNames = input
              .split(",")
              .map(name => capitalizarNombre(name.trim()))
              .filter(name => name && !people.includes(name));


              if (newNames.length > 0) {
                setPeople([...people, ...newNames]);
              }

              setShowGroupMenu(false);
            }}
          >
            ➕ Add Member
          </button>

          <br />

          <button
            onClick={() => {
              setEditMode(!editMode);
              setShowGroupMenu(false);
            }}
          >
            {"✏️ Edit Members"}
          </button>

        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <h3>Add Expense</h3>
        <label>
          Payer:
          <select
            value={newExpense.paid_by}
            onChange={(e) =>
              setNewExpense({ ...newExpense, paid_by: e.target.value })
            }
          >
            <option value="">Select</option>
            {people.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: 10 }}>
          Amount:{" "}
          <input
            type="number"
            value={newExpense.amount}
            onChange={(e) =>
              setNewExpense({ ...newExpense, amount: e.target.value })
            }
          />
        </label>

        <div>
          <p>Split between:</p>
          {people.map((p) => (
            <label key={p} style={{ marginRight: 10 }}>
              <input
                type="checkbox"
                checked={newExpense.split_between.includes(p)}
                onChange={() => toggleSplitPerson(p)}
              />
              {p}
            </label>
          ))}
        </div>

        <button onClick={handleAddExpense}>➕</button>
      </div>

      <div>
        <h3>Expenses</h3>
        {expenses.map((exp, idx) => {
          const isSplitWithAll = exp.split_between.length === people.length;
          return (
            <div key={idx}>
              <strong>{exp.paid_by}</strong> paid €{exp.amount} split between{" "}
              {isSplitWithAll ? "everyone" : exp.split_between.join(", ")}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={simplifyExpenses}>Simplify</button>
      </div>

      <div>
        <h3>Settlements</h3>
        {transactions.map((t, idx) => (
          <div key={idx}>
            {t.from} → {t.to}: €{t.amount}
          </div>
        ))}
      </div>

      <ShoppingList people={people} items={items} setItems={setItems} />
    </div>
  );
}

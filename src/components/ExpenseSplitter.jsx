import React, { useState } from "react";
import ShoppingList from "./ShoppingList";
import AddExpensePopup from "../popups/AddExpensePopup";
import AddItemPopup from "../popups/AddItemPopup";
import AddMemberPopup from "../popups/AddMemberPopup";
import GroupMenuPopup from "../popups/GroupMenuPopup";

export default function ExpenseSplitter() {
  const [tripTitle, setTripTitle] = useState("");
  const [editingTitle, setEditingTitle] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [showGroupMenu, setShowGroupMenu] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);

  const [people, setPeople] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [items, setItems] = useState([]);

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
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
              textAlign: "center",
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

            <div style={{ 
              marginTop: 20,
              textAlign: "center"
              }}>
        <button onClick={simplifyExpenses}>Simplify</button>
      </div>

      <div>
        {transactions.map((t, idx) => (
          <div key={idx}>
            {t.from} → {t.to}: €{t.amount}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ margin: 0 }}>Group Members</h3>
        <button
          onClick={() => setShowGroupMenu(true)}
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
        {people
          .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
          .join(", ")}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <h3 style={{ margin: 0 }}>Expenses</h3>
        <button onClick={() => setShowAddExpense(true)}>➕</button>
      </div>

      <div>
        {expenses.map((exp, idx) => {
          const isSplitWithAll = exp.split_between.length === people.length;
          return (
            <div key={idx}>
              <strong>{exp.paid_by}</strong> paid €{exp.amount} for{" "}
              <em>{exp.name}</em> split between{" "}
              {isSplitWithAll ? "everyone" : exp.split_between.join(", ")}
            </div>
          );
        })}
      </div>



<ShoppingList items={items} setItems={setItems} people={people} />



      {showAddExpense && (
        <AddExpensePopup
          people={people}
          onAdd={handleAddExpense}
          onClose={() => setShowAddExpense(false)}
        />
      )}

      {showAddItem && (
        <AddItemPopup
          people={people}
          onAdd={(item) => setItems([...items, item])}
          onClose={() => setShowAddItem(false)}
        />
      )}

      {showAddMember && (
        <AddMemberPopup
          existingNames={people}
          onAdd={(newNames) => setPeople([...people, ...newNames])}
          onClose={() => setShowAddMember(false)}
        />
      )}

      {showGroupMenu && (
        <GroupMenuPopup
          onAdd={() => setShowAddMember(true)}
          onEditToggle={() => {
            setEditMode(!editMode);
            setShowGroupMenu(false);
          }}
          onClearAll={() => {
            setPeople([]);
          }}
          onClose={() => setShowGroupMenu(false)}
        />
      )}
    </div>
  );
}
